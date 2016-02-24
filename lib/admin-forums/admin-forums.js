import debug from 'debug';
import page from 'page';
import { findAll, clearForumStore } from '../forum-middlewares/forum-middlewares.js';
import View from './view';
import ForumForm from '../admin-forums-form/form';
const log = debug('democracyos:admin-forums');

page('/admin/forums', clearForumStore, findAll, ctx => {
  var view = new View({
    forums: ctx.forums
  });
  view.replace('.admin-content');
  ctx.sidebar.set('forums');
});

page('/admin/forums/create', ctx => {
  log('render /admin/forums/create');

  let form = new ForumForm();
  form.replace('.admin-content');
  ctx.sidebar.set('forums');
});
