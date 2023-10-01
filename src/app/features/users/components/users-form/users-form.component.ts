import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {IUser, MessageType} from "../../../../core/models";
import {Observable, of, Subject, switchMap, takeUntil, tap} from "rxjs";
import {DataService} from "../../../../services/data.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidationService} from "../../../../services/custom-validation.service";
import {MessageService} from "../../../../services/message.service";

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit, OnDestroy {
  user$!: Observable<IUser | null>;

  userForm: FormGroup = this.fb.group({
    id: [null],
    username: ['', [Validators.required]],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }],
    user_type: ['', Validators.required],
    password: ['', {
      validators: [Validators.required, this.customValidator.passwordValidator()],
      updateOn: 'blur'
    }],
    repeat_password: ['', {
      validators: [Validators.required],
      updateOn: 'blur'
    }]
  },
  {
    validators: [this.customValidator.matchPassword('password', 'repeat_password')]
  });

  get username() { return this.userForm.get('username'); }
  get firstName() { return this.userForm.get('first_name'); }
  get lastName() { return this.userForm.get('last_name'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }
  get repeatPassword() { return this.userForm.get('repeat_password'); }
  get userType() { return this.userForm.get('user_type'); }

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    private customValidator: CustomValidationService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit() {
    this.user$ = this.route.url.pipe(
      switchMap((urls: UrlSegment[]) => {
        if (urls[0].path === 'new') {
          this.username?.addAsyncValidators([this.customValidator.usernameValidator()])
          return of(this.userForm.value)
        } else {
          return this.dataService.getUser(urls[0].path)
        }
      }),
      tap((user: IUser) => this.userForm.patchValue(user))
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  closeEditor(): void {
    this.router.navigate(['/users']);
  }

  saveNewUser(): void {
    if (this.userForm.valid) {
      this.dataService.saveUser(this.userForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: () => {
            this.closeEditor();
            this.messageService.showMessage({
              type: MessageType.SUCCESS,
              text: 'User successfully created!'
            })
          },
          error: (error) => this.messageService.showMessage({
            type: MessageType.ERROR,
            text: error?.message
          })
        });
    }
  }

  updateUser(): void {
    if (this.userForm.valid) {
      this.dataService.updateUser(this.userForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: () => {
            this.closeEditor();
            this.messageService.showMessage({
              type: MessageType.SUCCESS,
              text: 'User successfully updated!'
            })
          },
          error: (error) => this.messageService.showMessage({
            type: MessageType.ERROR,
            text: error?.message
          })
        });
    }
  }

  deleteUser(): void {
    this.dataService.deleteUser(this.userForm.value.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.closeEditor();
          this.messageService.showMessage({
            type: MessageType.SUCCESS,
            text: 'User successfully deleted!'
          })
        },
        error: (error) => this.messageService.showMessage({
          type: MessageType.ERROR,
          text: error?.message
        })
      });
  }
}
