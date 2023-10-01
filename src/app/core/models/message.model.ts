export interface IMessage {
  type: MessageType,
  text: string
}

export enum MessageType {
  SUCCESS = "success",
  ERROR = "error"
}
