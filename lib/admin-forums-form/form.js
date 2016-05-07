import lock from 'democracyos-loading-lock';
import bus from 'bus';
import page from 'page';
import t from 't-component';
import config from '../config/config.js';
import FormView from '../form-view/form-view.js';
import ForumUnique from '../forum-unique/forum-unique.js';
import template from './template.jade';
import DeleteForumModal from '../settings-forum/delete-modal-view.js';

import analytics from '../analytics';

export default class ForumForm extends FormView {

  /**
   * ForumForm
   *
   * @return {ForumForm} `ForumForm` instance.
   * @api public
   */

  constructor (forum) {
    super();
    this.forum = forum;
    this.setOptions(forum);
    super(template, this.options);
    this.elUrl = this.find('input[name="name"]');
    this.form = this.find('form');
    this.forumUnique = new ForumUnique({
      el: this.elUrl,
      value: forum ? forum.name : ''
    });
    this.deleteModal = null;
  }

  setOptions(forum) {
    var action = '/api/forum/';
    this.options = {
      domain: `${config.protocol}://${config.host}${config.subPath}/`,
      forum: forum || {},
      form: forum ? {
        action: action + forum.id,
        title: 'admin-forums-form.title.edit',
        icon: 'fa fa-floppy-o',
        submit: 'common.save'
      } : {
        action: action + 'create',
        title: 'admin-forums-form.title.create',
        icon: 'fa fa-plus',
        submit: 'common.add'
      }
    };
  }

  switchOn () {
    this.on('success', this.bound('onsuccess'));
    this.forumUnique.on('success', this.bound('onuserchecked'));
    this.bind('click', '.btn-delete', this.bound('showDeleteModal'));
  }

  switchOff () {
    this.unbind();
    this.off('success', this.bound('onsuccess'));
    this.forumUnique.off('success', this.bound('onuserchecked'));
    if (this.deleteModal) this.deleteModal.hide();
  }

  onuserchecked (res) {
    let container = this.find('.subdomain');
    let message = this.find('.subdomain .name-unavailable');

    if (res.exists) {
      container.addClass('has-error');
      container.removeClass('has-success');
      message.removeClass('hide');
    } else {
      container.removeClass('has-error');
      container.addClass('has-success');
      message.addClass('hide');
    }
  }

  onsuccess (res) {
    analytics.track('create forum', { forum: res.body.id });
    this.onsave();
  }

  onsave() {
    this.messages([t('admin-forums-form.message.onsuccess')]);
  }

  removeDeleteModal () {
    super.remove();
    if (this.deleteModal) {
      this.deleteModal.remove();
      this.deleteModal = null;
    }
  }

  showDeleteModal () {
    if (!this.deleteModal) {
      this.deleteModal = new DeleteForumModal(this.forum);
      var that = this;
      bus.once(`forum-store:destroy:${this.forum.id}`, () => {
        that.removeDeleteModal();
        page('/admin/forums');
      });
    }
    this.deleteModal.show();
  }

  loading () {
    this.disable();
    this.messageTimer = setTimeout(() => {
      this.messages(t('forum.form.create.wait'), 'sending');
      this.spin();
      this.find('a.cancel').addClass('enabled');
    }, 1000);
  }

  spin () {
    var div = this.find('.fieldsets');
    if (!div.length) return;
    this.spinTimer = setTimeout(() => {
      this.spinner = lock(div[0], { size: 100 });
      this.spinner.lock();
    }, 500);
  }

  unspin () {
    clearTimeout(this.spinTimer);
    if (!this.spinner) return;
    this.spinner.unlock();
  }

  disable () {
    this.disabled = true;
    this.form.attr('disabled', true);
    this.find('button').attr('disabled', true);
  }

  enable () {
    this.disabled = false;
    this.form.attr('disabled', null);
    this.find('button').attr('disabled', null);
  }

}
