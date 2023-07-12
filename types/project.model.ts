import { _DocumentBaseModel } from "./_document-base-model";
import { _SanityContentBlockModel } from "./_sanity-content-block-model";
import { _SanityImageModel } from "./_sanity_image-model";

export interface ProjectModel extends _DocumentBaseModel {
  name: string;
  slug: string;
  publishedAt: Date;
  image: _SanityImageModel;
  url: string;
  content: _SanityContentBlockModel;
}

//-- name:  ProjectListItemDTO
//-- desc:  Used for listing projects.  Very bare-bones set of properties
export type ProjectListItemDTO = Pick<ProjectModel, 'name' | 'slug' | 'publishedAt'>;

//--  name: ProjectDetailDTO
//--  desc: Used to display a Project
//--        All of the _DocumentBaseModel props are optional and may not be present
export type ProjectDetailDTO = Exclude<ProjectModel, _DocumentBaseModel> & Partial<_DocumentBaseModel>;

