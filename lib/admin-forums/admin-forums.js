import page from 'page';
import { findAll, clearForumStore } from '../forum-middlewares/forum-middlewares.js';
import View from './view';

page('/admin/forums', clearForumStore, findAll, ctx => {
  var view = new View({
    forums: ctx.forums
  });
  view.replace('.admin-content');
  ctx.sidebar.set('forums');
});
