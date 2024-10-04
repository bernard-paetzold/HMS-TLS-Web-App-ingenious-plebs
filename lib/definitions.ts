export type assignment = {
  id: number;
  created_at: Date;
  subject: string;
  name: string;
  due_date: Date;
  assignment_info: string;
  lecturer_id: number;
};

export type submission = {
  id: number;
  datetime: Date;
  file: string;
  comment: string;
  user_id: number;
  assignment_id: number;
};
