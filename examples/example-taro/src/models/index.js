import { appendExtraBuilder } from 'easy-soft-utility';

import { buildArticle } from './article';
import { buildSchedulingControl } from './schedulingControl';

function collectModelBuilder() {
  appendExtraBuilder(buildArticle, buildSchedulingControl);
}
collectModelBuilder();

export function prepareModel() {}
