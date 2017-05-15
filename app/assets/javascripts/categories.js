// class Category {
//   constructor(attributes) {
//     this.id = attributes.id;
//     this.name = attributes.name;
//   }
//
//   // Render handlebars template
//   renderIndexCategory() {
//     return indexCategoryTemplate(this);
//   }
//
//   compileIndexCategoryTemplate() {
//     indexCategorySource = $("#indexCategoryTemplate").html();
//     if (indexCategorySource !== undefined) {
//       indexCategoryTemplate = Handlebars.compile(indexCategorySource);
//     }
//   }
//
//   // Get all categories via AJAX GET request
//   indexCategories() {
//     var url = window.location.pathname;
//     $.get(url, function(data) {
//       $.each(data, function(index, category) {
//         var indexCategory = new Category(category);
//         var indexCategoryRender = indexCategory.renderIndexCategory();
//         $(".categories-block").prepend(indexCategoryRender);
//       });
//     }, "json");
//   }
// }

$(document).ready(function() {
  compileIndexCategoryTemplate();
  indexCategories();
  compileNewCategoryTemplate();
  newCategory();
});

function Category(attributes) {
  this.id = attributes.id;
  this.name = attributes.name;
}

// // Render handlebars template
Category.prototype.renderIndexCategory = function() {
  return indexCategoryTemplate({id: this.id, name: this.name});
}

Category.prototype.renderNewCategory = function() {
  return newCategoryTemplate({id: this.id, name: this.name});
}

// Compile stuff
function compileIndexCategoryTemplate() {
  var indexCategorySource = $("#indexCategoryTemplate").html();
  if (indexCategorySource !== undefined) {
    indexCategoryTemplate = Handlebars.compile(indexCategorySource);
  }
}

function compileNewCategoryTemplate(){
 newCategorySource = $("#newCategoryTemplate").html();
 if ( newCategorySource !== undefined ) {
  newCategoryTemplate = Handlebars.compile(newCategorySource);
 }
}

// Get all categories via AJAX GET request
function indexCategories() {
  var url = window.location.pathname;
  $.get(url, function(data) {
    $.each(data, function(index, category) {
      var indexCategory = new Category(category);
      var indexCategoryRender = indexCategory.renderIndexCategory();
      $(".categories-block").prepend(indexCategoryRender);
    })
  }, "json");
}

// Get the new note form via AJAX GET request
function newCategory() {
 $(document).on("click", '.js-new-category', function(event) {
  event.preventDefault();
  $.get( $(event.target).attr('href'), function( data ) {
   var category = new Category(data);
   var categoryRender = category.renderNewCategory();
   $("#new-category").html("");
   $("#new-category").append(categoryRender);
  });
 });
}
