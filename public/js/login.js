$(document).ready(function() {
    $('#login_button').click(function() {
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        
        $.ajax({
            type: 'POST',
            url: 'login.php',
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                // Manejar la respuesta del servidor
                if (response === "success") {
                    alert("Login successful!");
                    // Redirigir o hacer cualquier otra acción que desees
                } else {
                    alert("Login failed. Please try again.");
                }
            }
        });
    });
});
