export interface Notification {
  id: number;
  title: string;
  body: string;
  image?: string;
  createdDate: string;
}

export interface NotificationResponse {
  success: boolean;
  data: Notification[];
}
