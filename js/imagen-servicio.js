
let imagenUrl = '';
$(function() {


    $.cloudinary.config({ cloud_name: 'proyecto1-nebula', api_key: '658182659239913'});

    
    let uploadButton = $('#btnSeleccionarImagen');

   
    uploadButton.on('click', function(e){
        
        cloudinary.openUploadWidget({ cloud_name: 'proyecto1-nebula', upload_preset: 'nebula', tags: ['cgal']},
        function(error, result) {
            if(error) console.log(error);
           
            let id = result[0].public_id;
             console.log(id);
            imagenUrl = 'https://res.cloudinary.com/proyecto1-nebula/image/upload/' + id;
            document.querySelector('#imagePreview').src = imagenUrl;
          console.log(imagenUrl);
        });
    });
})

function processImage(id) {
    let options = {
        client_hints: true,
    };
    return  $.cloudinary.url(id, options);
}