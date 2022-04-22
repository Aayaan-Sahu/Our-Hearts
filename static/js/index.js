let displayed = false;

const smoking = document.getElementById('smoking');
smoking.addEventListener('click', function handleClick() {
    document.getElementById('image').src = "../static/smoking_and_heartdisease.png";
    if (displayed) {
        // document.getElementById('image').style.opacity = 0;
        document.getElementById('image').style.display = 'none';
        displayed = false;
    } else {
        document.getElementById('image').style.display = 'block';
        displayed = true;
    }
});

const diabetic = document.getElementById('alcohol');
diabetic.addEventListener('click', function handleClick() {
    document.getElementById('image').src = "../static/alcohol_and_heartdisease.png";
    if (displayed) {
        document.getElementById('image').style.display = 'none';
        displayed = false;
    } else {
        document.getElementById('image').style.display = 'block';
        displayed = true;
    }
});

const kidney = document.getElementById('kidney');
kidney.addEventListener('click', function handleClick() {
    document.getElementById('image').src = "../static/kidneydisease_and_heartdisease.png";
    if (displayed) {
        document.getElementById('image').style.display = 'none';
        displayed = false;
    } else {
        document.getElementById('image').style.display = 'block';
        displayed = true;
    }
});

const bmi = document.getElementById('bmi');
bmi.addEventListener('click', function handleClick() {
    document.getElementById('image').src = "../static/BMI.png";
    if (displayed) {
        document.getElementById('image').style.display = 'none';
        displayed = false;
    } else {
        document.getElementById('image').style.display = 'block';
        displayed = true;
    }
});

$('#form').on('submit', function(e){ 
    let query = $('#sql').val();
    let checked = document.getElementById('hue').checked;
    console.log(query);
    e.preventDefault(); 
    $.ajax({ 
        url: 'http://127.0.0.1:5000/query/', 
        data: {
            'query': query,
            'hue': checked,
        },
        method: 'POST', 
        success: function(data) { 
            document.getElementById('image').style.display = 'none';
            document.getElementById('image').src = "../static/temp.png?t=" + new Date().getTime();
            document.getElementById('image').style.display = 'block';
            displayed = true;
            console.log("Success");
        }
    }); 
}); 
