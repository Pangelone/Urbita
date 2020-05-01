//Ejecuto JS tras carga total de la pagina

window.addEventListener("load",function() {

    //Guardo avatar con axios y cloudinari

    const imagePreview = document.getElementById('preview');
    const imageUploader = document.getElementById('avatar');
    const urlimagen = document.getElementById('urlimagen');
    const imageUploadbar = document.getElementById('img-upload-bar');

    
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dk1pg1fsw/image/upload`
    const CLOUDINARY_UPLOAD_PRESET = 'vu7772rb';
    
    if (imageUploadbar != null){

        imageUploader.addEventListener('change', async (e) => {
            imageUploadbar.style.display = "block";
            // console.log(e);
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        
            // Send to cloudianry
            const res = await axios.post(
                CLOUDINARY_URL,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress (e) {
                        let progress = Math.round((e.loaded * 100.0) / e.total);
                        console.log(progress);
                        imageUploadbar.setAttribute('value', progress);
                    }
                }
            );
            console.log(res);
            imagePreview.src = res.data.secure_url;
            urlimagen.value = res.data.secure_url;
            imageUploadbar.style.display = "none";
        });

    }


















    //Valido registro de usuarios

    let registro = document.getElementById("registrarse");
    
    if (registro != null) {

        registro.addEventListener("submit", function(e){

            let errores = [];
    
            while (document.getElementById("listaerrores").firstChild) {
            document.getElementById("listaerrores").removeChild(document.getElementById("listaerrores").firstChild);
            }
    
            let contraseña = document.getElementById("contraseña");
            let contraseña2 = document.getElementById("contraseña2");
            let imagen = document.getElementById("urlimagen");
    
            document.getElementById("errores").style.display = "none";
    
            if (contraseña.value != contraseña2.value){
                errores.push("Las contraseñas no coinciden.")
            };
    
            if (imagen.value ==""){
                errores.push("No has subido ninguna imagen.")
            };
    
            if (errores.length >0){
    
                e.preventDefault()
                let ulerrores = document.querySelector("div.errores ul");
    
                for (let i=0; i<errores.length; i++){
                    ulerrores.innerHTML += "<li>" + errores[i] +  "</li>"
                };
            }
        });

    }











        //Valido registro de Solicitud de viaje

        let registro2 = document.getElementById("SolicitarViaje");
    
        if (registro2 != null) {
    
            registro2.addEventListener("submit", function(e){
    
                let errores = [];
        
                while (document.getElementById("listaerrores").firstChild) {
                document.getElementById("listaerrores").removeChild(document.getElementById("listaerrores").firstChild);
                }
        
                let Desde = document.getElementById("Desde");
                let Hasta = document.getElementById("Hasta");
        
                document.getElementById("errores").style.display = "none";
        
                if (Desde.value == Hasta.value){
                    errores.push("El origen y el destino, no pueden ser iguales.")
                };
                
                if (errores.length >0){
        
                    e.preventDefault()
                    let ulerrores = document.querySelector("div.errores ul");
        
                    for (let i=0; i<errores.length; i++){
                        ulerrores.innerHTML += "<li>" + errores[i] +  "</li>"
                    };
                    
                }
            });
    
        }















    //Valido registro de Autos

    let registroAuto = document.getElementById("RegistrarAuto");

    if (registroAuto != null) {

        registroAuto.addEventListener("submit", function(e){

            let erroresAuto = [];

            while (document.getElementById("listaerrores").firstChild) {
            document.getElementById("listaerrores").removeChild(document.getElementById("listaerrores").firstChild);
            }

            let desde = parseInt(document.getElementById("Desde").value.toString().slice(0, 2)) * 60 + parseInt(document.getElementById("Desde").value.toString().slice(3, 5));
            let hasta = parseInt(document.getElementById("Hasta").value.toString().slice(0, 2)) * 60 + parseInt(document.getElementById("Hasta").value.toString().slice(3, 5));
            let horario = (hasta - desde) / 60

            if (horario ==8 || horario == (-16)){
                
            } else{
                erroresAuto.push("El horario laboral debe ser igual a 8 horas.")
            }

            if (erroresAuto.length >0){

                e.preventDefault()
                let ulerrores = document.querySelector("div.errores ul");

                for (let i=0; i<erroresAuto.length; i++){
                    ulerrores.innerHTML += "<li>" + erroresAuto[i] +  "</li>"
                };
            }
        });

    }














    //Lleno input con select en crearautos

    let autoselect = document.getElementById("Marcas");
    let autoinput = document.getElementById("Marca");

    if (autoselect != null) {

        autoselect.addEventListener("change", function(){
            autoinput.value = autoselect.selectedIndex + 4 

        });

    }
















    //Muestro mensaje al solicitar viaje

    let SolicitarViaje = document.getElementById("SolicitarViaje");
    let variablemensaje = document.getElementById("variablemensaje");

    if (SolicitarViaje != null) {
        if (variablemensaje.value.length >10 ){
            document.getElementById("terminarviaje").style.display = "block";
        }
        SolicitarViaje.addEventListener("submit", function(e){
            if (variablemensaje.value != "" ){
                e.preventDefault()
                errores.innerHTML = "Ya se encuentra un viaje en curso."
            }


        });

    }


        








});
