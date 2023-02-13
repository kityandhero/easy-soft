import { appendExtraBuilder } from 'easy-soft-utility';

import { buildArticle } from './article';

function collectModelBuilder() {
  appendExtraBuilder(buildArticle);
}

collectModelBuilder();

export function prepareModel() {}
