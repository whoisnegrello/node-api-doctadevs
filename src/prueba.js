let miPrimeraPromise = new Promise(function(resolve, reject) {
    // Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
    // En este ejemplo, usamos setTimeout(...) para simular código asíncrono. 
    // En la vida real, probablemente uses algo como XHR o una API HTML5.
    setTimeout(function(){
        reject("Error");
    }, 2500);
    resolve("¡Éxito!"); // ¡Todo salió bien!
  });

  miPrimeraPromise
  .then((successMessage) => {
    // succesMessage es lo que sea que pasamos en la función resolve(...) de arriba.
    // No tiene por qué ser un string, pero si solo es un mensaje de éxito, probablemente lo sea.
    console.log("¡Sí! " + successMessage);
    return successMessage;
  })
  .then((res) => {
      console.log(res);
  })
  .catch(function(error) {
    console.log(error);
  });