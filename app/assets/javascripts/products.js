$(document).ready(function() {

  var BASEURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1'

  function loadProducts() {
    $('#products').empty();
    $.ajax({
      url: BASEURL + '/products',
      type: 'GET',
      dataType: 'JSON'
    }).done(function(data) {
      data.forEach(function(product) {
        $('#products').append('<li data-products-id="' + product.id + '">' + product.name +
                              '<button class="delete_product">Delete</button> \
                              <button class="edit_button">Edit</button> \
                              </li>');
      });
      console.log(data);
    }).fail(function(data) {
      console.log(data);
    });
  }

  $('#load_products').click(function() {
    loadProducts();
  });

  $(document).on('click', '.delete_product', function() {
    var productId = $(this).parent().data('productsId');
    $.ajax({
      url: BASEURL + '/products/' + productId,
      type: 'DELETE',
      dataType: 'JSON'
    }).done(function(data){
      console.log(data);
      loadProducts();
    }).fail(function(data){
    });
  });

  $('#add_product').click(function(){
    var $newProduct = $('#new_product');
    $newProduct.slideToggle(400, function() {
      var $createButton = $('#add_product')
      if($newProduct.is(':hidden')) {
        $createButton.text('Add Product');
      } else {
        $createButton.text('Hide Add Product');
      }
    });
  });

  $('#new_product').submit(function(e) {
    e.preventDefault();

    var $productName = $('#product_name');
    var $productPrice = $('#product_price');
    var $productDescription = $('#product_description');
    var $productQuantity = $('#product_quantity');
    var $productColor = $('#product_color');
    var $productWeight = $('#product_weight');
    var $productAttribute = $('#product_attributes');
    var form = this;
    var productId = ('#product_id').val();

    $.ajax({
      url: BASEURL + $(this).attr('action'),
      type: $(this).attr('method'),
      dataType: 'JSON',
      data: $(this).serializeArray()
    }).done(function(data){
      form.reset();
      loadProducts();
    }).fail(function(data){
    });
  });

  $(document).on('click', '.edit_button', function(){
    var productId = $(this).parent().data('productsId');
    $.ajax({
      url: BASEURL + '/products/' + productId,
      type: 'GET',
      dataType: 'JSON'
    }).done(function(data){
      var name = data.name;
      var price = data.base_price;
      var description = data.description;
      var quantity = data.quantity_on_hand;
      var color = data.color;
      var weight = data.weight;
      var attribute = data.other_attributes;
      $('#edit_name').val(name);
      $('#edit_price').val(price);
      $('#edit_description').val(description);
      $('#edit_quantity').val(quantity);
      $('#edit_color').val(color);
      $('#edit_weight').val(weight);
      $('#edit_attributes').val(attribute);
      $('#edit_content').slideDown();
    }).fail(function(data){

    });
  });

  $('#edit_product').submit(function(e){
    e.preventDefault();
    var form = this;
    var productId = $('#product_id').val();
    $.ajax({
      url: BASEURL + '/products/' + productId,
      type: 'PUT',
      dataType: 'JSON',
      data: $(this).serializeArray()
    }).done(function(data){
        form.reset();
        $('#edit_content').slideUp();
        loadProducts();
    }).fail(function(data){

    });
  });


});
