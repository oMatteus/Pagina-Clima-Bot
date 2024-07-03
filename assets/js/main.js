async function loadPage(){
    console.log('INICIO');
    try{
        const res = await fetch('clima.html');

        if(res.status !== 200){
            throw new Error('404 page not found');
        };
        const html = await res.text();

        loadResult(html)
    }catch(e){
        console.log(e);
    };
};

function loadResult(res){
    const result = document.querySelector('body');
    result.innerHTML = res;
}

const form = document.querySelector(".form");

form.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const input = document.querySelector('#cidade');

    if(!input.value){
        alert('Digite o nome de uma cidade');
        return
    }
    console.log(input.value);
    await loadPage();
    await start(input.value)
})


class WeatherForecast{
    constructor(nome){
        this.nome = nome;
        this.result = '';
        this.previsao = '';
        this.unit='°';
    };

    async getForecast(){
        const request = await fetch(`http://54.233.6.105:3333/clima/${this.nome}`);
    
        const clima = await request.json();
    
        this.previsao = clima;
    };
};

async function start(local){
    const cidade = new WeatherForecast(`${local}`);
    
    await cidade.getForecast();
    printCurrentForecast(cidade);
    printWeekForecast(cidade);
    hideSkeleton(true);
};

function printCurrentForecast(cidade){

    console.log(cidade.previsao.semana);

    const elements = {
        title: document.querySelector('.title'),
        currentTitle: document.querySelector('.current-title'),
        currentTemperature: document.querySelector('.current-temperature'),
        currentTemperatureText: document.querySelector('.current-temperature-text'),
        currentIcon: document.querySelector('.icone-grande'),
    };

    const currentWeatherForecast = cidade.previsao.hoje;
    console.log(currentWeatherForecast);

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

function printWeekForecast(cidade){

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

function hideSkeleton(boleano){
    const skeleton = document.querySelector('.skeleton');

    if(boleano) return skeleton.style.display = 'none';
    return skeleton.style.display = ''
}