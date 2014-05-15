$(function() {

   var $gallery = $( ".a2" ),
     $trash = $( "#trash" );

   
   $( "div", $gallery ).draggable({
     cancel: "a.ui-icon",
     revert: "invalid", // when not dropped, the item will revert back to its initial position
     containment: "document",
     helper: "clone",
     cursor: "move"
   });

   // let the trash be droppable, accepting the gallery items
   $trash.droppable({
     accept: ".gallery > div",
     activeClass: "div-state-highlight",
     drop: function( event, div ) {
       deleteImage( div.draggable );
     }
   });

   // let the gallery be droppable as well, accepting items from the trash
   $gallery.droppable({
     accept: "#trash div",
     activeClass: "custom-state-active",
     drop: function( event, div ) {
       recycleImage( div.draggable );
     }
   });

   // image deletion function
   var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>";
   function deleteImage( $item ) {
     $item.fadeOut(function() {
       var $list = $( "ul", $trash ).length ?
         $( "ul", $trash ) :
         $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $trash );

       $item.find( "a.ui-icon-trash" ).remove();
       $item.append( recycle_icon ).appendTo( $list ).fadeIn(function() {
         $item
           .animate({  })
           .find( "img" )
             .animate({ });
       });
     });
   }

   // image recycle function
   var trash_icon = "<a href='link/to/trash/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-trash'>Delete image</a>";
   function recycleImage( $item ) {
     $item.fadeOut(function() {
       $item
         .find( "a.ui-icon-refresh" )
           .remove()
         .end()
         .css( "width", "73px")
         .append( trash_icon )
         .find( "img" )
           .css( "height", "90px" )
         .end()
         .appendTo( $gallery )
         .fadeIn();
     });
   }

  

   // resolve the icons behavior with event delegation
   $( "div.gallery > div" ).click(function( event ) {
     var $item = $( this ),
       $target = $( event.target );

     if ( $target.is( "a.ui-icon-trash" ) ) {
       deleteImage( $item );
     } else if ( $target.is( "a.ui-icon-zoomin" ) ) {
       viewLargerImage( $target );
     } else if ( $target.is( "a.ui-icon-refresh" ) ) {
       recycleImage( $item );
     }

     return false;
   });
 });