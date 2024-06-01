import { Content } from "@prisma/client";
import { ScopeItems, UserFull } from "./user";

export enum ContentTypes {
  Article = 'article',
  Record = 'record',
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
  DateTime = 'dateTime',
  Type = 'type',
  State = 'state',
  ParentId = 'parentId',
  Published = 'published',
}

export interface ContentData {
  [ContentItems.Title]: string;
  [ContentItems.Text]: any;
  [ContentItems.DateTime]?: Date | null;
  [ContentItems.State]?: ContentState;
}

export type ContentFilterData = Partial<Pick<ContentData, ContentItems.Title>>;

export const contentScopes = {
  [ContentTypes.Article]: ScopeItems.Articles,
  [ContentTypes.Record]: ScopeItems.Records,
  [ContentTypes.Task]: ScopeItems.Tasks,
  [ContentTypes.New]: ScopeItems.News,
}

export type ContentFull = Content & {
  author: UserFull;
  isApproved: boolean;
  [ContentItems.Text]?: any;
}
