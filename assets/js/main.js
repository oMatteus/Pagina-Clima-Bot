class WeatherForecast{
    constructor(nome){
        this.nome = nome;
        this.result = '';
        this.previsao = '';
        this.unit='°';
    };

    async getForecast(){
        const request = await fetch(`http://18.228.192.215:3333/get`);
    
        const clima = await request.json();
    
        // console.log(clima);
        this.previsao = clima;
    };

    // weatherCodeVerify(id){

    //     const weatherCode = {
    //         0 : {
    //             text:'Céu limpo', 
    //             icon:'assets/img/icones/wi-day-sunny.svg', 
    //             bg:'assets/img/bg/ceu-limpo.jpg'},
    //         1 : {
    //             text:'Parcialmente limpo', 
    //             icon:'assets/img/icones/wi-day-cloudy.svg',
    //             bg:'assets/img/bg/ceu-limpo.jpg'},
    //         2 : {
    //             text:'Parcialmente nublado', 
    //             icon:'assets/img/icones/wi-day-cloudy-high.svg',
    //             bg:'assets/img/bg/ceu-limpo.jpg'},
    //         3 : {
    //             text:'Nublado', 
    //             icon:'assets/img/icones/wi-cloudy.svg'},
    //             bg:'assets/img/bg/ceu-limpo.jpg',
    //         45 : {
    //             text:'Névoa', 
    //             icon:'assets/img/icones/wi-fog.svg',
    //             bg:'assets/img/bg/ceu-limpo.jpg'},
    //         51 : {
    //             text:'Garoa Leve', 
    //             icon:'assets/img/icones/wi-raindrop.svg',
    //             bg:'assets/img/bg/ceu-limpo.jpg'},
    //         53 : {
    //             text:'Garoa Moderada',  
    //             icon:'assets/img/icones/wi-raindrops.svg',
    //             bg:'assets/img/bg/ceu-limpo.jpg'},
    //         55 : {
    //             text:'Garoa Intensa', 
    //             icon:'assets/img/icones/wi-rain.svg',
    //             bg:'assets/img/bg/ceu-limpo.jpg'},
    //         63: {
    //             text:'Garoa Intensa', 
    //             icon:'assets/img/icones/wi-rain.svg',
    //             bg:'assets/img/bg/ceu-limpo.jpg'},
    //         80 : {
    //             text:'Leves pancadas de chuva', 
    //             icon:'assets/img/icones/wi-showers.svg',
    //             bg:'assets/img/bg/ceu-limpo.jpg'},
    //         81 : {
    //             text:'Pancadas de chuva', 
    //             icon:'assets/img/icones/wi-rain-wind.svg',
    //             bg:'assets/img/bg/ceu-limpo.jpg'},
    //         82 : {
    //             text:'Pancadas de chuva intensa', 
    //             icon:'assets/img/icones/wi-night-thunderstorm.svg',
    //             bg:'assets/img/bg/ceu-limpo.jpg'},
    //         95 : {
    //             text:'Pancadas de chuva intensa', 
    //             icon:'assets/img/icones/wi-night-thunderstorm.svg',
    //             bg:'assets/img/bg/ceu-limpo.jpg'},
    //         96 : {
    //             text:'Pancadas de chuva intensa', 
    //             icon:'assets/img/icones/wi-night-thunderstorm.svg',
    //             bg:'assets/img/bg/ceu-limpo.jpg'},
    //         99 : {
    //             text:'Pancadas de chuva intensa', 
    //             icon:'assets/img/icones/wi-night-thunderstorm.svg',
    //             bg:'assets/img/bg/ceu-limpo.jpg'},
                
        
                
    //     };

    //     if( weatherCode[id] === 'undefined') console.log('Invalid code');
        
    //     return weatherCode[id];
    // };
};

const cidade = new WeatherForecast('Guarulhos')

async function start(){
    await cidade.getForecast();
    hideSkeleton();
    printCurrentForecast();
    printWeekForecast();
};
start()


function printCurrentForecast(){

    console.log(cidade.previsao.semana);

    const elements = {
        title: document.querySelector('.title'),
        currentTitle: document.querySelector('.current-title'),
        currentTemperature: document.querySelector('.current-temperature'),
        currentTemperatureText: document.querySelector('.current-temperature-text'),
        currentIcon: document.querySelector('.icone-grande'),
    };

    const currentWeatherForecast = cidade.previsao.hoje;
    // console.log(currentWeatherForecast);

    elements.title.innerHTML += currentWeatherForecast.cidade;
    elements.currentTitle.innerHTML = currentWeatherForecast.dia.slice(0, -7);
    elements.currentIcon.setAttribute('src', currentWeatherForecast.img);
    elements.currentTemperatureText.innerHTML = currentWeatherForecast.descricao;
    elements.currentTemperature.innerHTML += currentWeatherForecast.temperatura + cidade.unit;

    // dynamicBG(currentWeatherCode);
    // function dynamicBG(e){
    //     // const bg = document.querySelector()
    //     // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    //     // console.log(e);
    // }
};

function printWeekForecast(){

    cidade.previsao.semana.forEach((previsao, index) => {
        if(!index) return;

        const dayOfWeek = document.querySelector(`#card${index} .day-of-week`);
        const card = document.querySelector(`#card${index} .card-icon`);
        const cardDescription = document.querySelector(`#card${index} .card-description`)


        card.setAttribute('src', previsao.img);
        cardDescription.innerText = previsao.descricao
        dayOfWeek.innerText = previsao.dia.slice(0, -1)


        const maxTemp = document.querySelector(`#card${index} .max-line p`);
        const minTemp = document.querySelector(`#card${index} .min-line p`);
        maxTemp.innerHTML = previsao.tempMax;
        minTemp.innerHTML = previsao.tempMin;

    });
}

function hideSkeleton(){
    const skeleton = document.querySelector('.skeleton');
    skeleton.style.display = 'none'
}