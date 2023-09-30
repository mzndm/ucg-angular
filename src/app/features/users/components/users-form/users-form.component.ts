import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {IUser} from "../../../../core/models";
import {Observable, of, Subject, switchMap, takeUntil, tap} from "rxjs";
import {DataService} from "../../../../services/data.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit, OnDestroy {
  user$!: Observable<IUser | null>;

  userForm: FormGroup = this.fb.group({
    id: [null],
    username: ['', Validators.required],
    first_name: [''],
    last_name: [''],
    email: [''],
    password: [''],
    user_type: ['']
  });

  warn: any;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.user$ = this.route.url.pipe(
      switchMap((urls: UrlSegment[]) => {
        if (urls[0].path === 'new') {
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
    // todo: show alarm for unsaved changes
    this.router.navigate(['/users'])
  }

  saveNewUser(): void {
    this.dataService.saveUser(this.userForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.closeEditor());
  }

  updateUser(): void {
    this.dataService.updateUser(this.userForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.closeEditor());
  }

  deleteUser(): void {
    this.dataService.deleteUser(this.userForm.value.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.closeEditor());
  }
}
