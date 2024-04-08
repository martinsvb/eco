export enum ContentTypes {
  Article = 'article',
  Task = 'task',
  New = 'new',
}

export enum ContentState {
  Created = 'created',
  InProgress = 'inProgress',
  Done = 'done',
  Deleted = 'deleted',
}

export enum ContentItems {
  Title = 'title',
  Text = 'text',
  Type = 'type',
  State = 'state',
  Published = 'published',
}

export interface ContentData {
  [ContentItems.Title]: string;
  [ContentItems.Text]?: string;
  [ContentItems.State]?: ContentState;
}
