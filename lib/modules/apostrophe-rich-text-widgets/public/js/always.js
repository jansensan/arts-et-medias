apos.define('apostrophe-rich-text-widgets', {
  extend: 'apostrophe-widgets',

  label: 'Text',

  construct: function (self, options) {

    self.getData = function ($widget) {
      // our data is our markup
      var $text = $widget.find('[data-rich-text]');
      // If it's an active contenteditable, use getData() to
      // give ckeditor a chance to clean it up
      var id = $text.attr('id');
      var content;
      if (id && ((typeof CKEDITOR) !== 'undefined')) {
        var instance = CKEDITOR.instances[id];
        if (instance) {
          content = instance.getData();
        }
      }
      if (!content) {
        content = $widget.find('[data-rich-text]').html();
      }
      // Merge with properties found in the data attribute
      // of the widget, such as _id
      var data = JSON.parse($widget.attr('data') || '{}');

      // Only set the type if it is not already set.
      _.defaults(data, {
        type: 'apostrophe-rich-text'
      });

      _.extend(data, {
        content: content
      });

      return _.omit(data, ['_edit']);
    };

  }
});
