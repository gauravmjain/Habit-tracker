$('#sign-in-link').click((e)=>{
    e.preventDefault();
    $.ajax({
        type : 'get',
        url : "/",
        success : function (data){
            let sign_in = sign_in_data();
            $('#render-sign-list').html(sign_in);
           

        },error: function (err){
            console.error('Request failed with status:',err.responseText);   
        }        
    })

})
$('#sign-up-link').click((e)=>{
    e.preventDefault();
    $.ajax({
        type :'get',
        url : "/",
        success : function (data){
            let sign_up = sign_up_data();
            $('#render-sign-list').html(sign_up);
           

        },error: function (err){
            console.error('Request failed with status:',err.responseText);   
        }        
    })

})



let sign_in_data = function(){
    return $(`
    <div id = "sign-in-container">
        <form action="/users/create-session" method="post">
            <input type="email" name="email" placeholder="Emaill" required>
            <input type="password" name="password"  placeholder="Password" required>
            <button type="submit" >Sign In</button>
        </form>
    </div>
    `);
}

let sign_up_data = function(){
    return $(`
    <link rel="stylesheet" href="/css/_sign_up.css">
    <div id="sign-up-container"> 
        <form action="/users/create" method="POST">
            <input type="text" name="name" id="" placeholder="Your name " required>
            <input type="email" name="email" id="" placeholder="Email Id " required>
            <input type="password" name = 'password' placeholder="password " required>
            <input type="password" name = 'confirm_password' placeholder="Confirm password " required>
            <button type = "submit">Submit</button>
        </form>
    </div>

    `)
}