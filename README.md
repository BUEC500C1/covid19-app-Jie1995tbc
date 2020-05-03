## Project Description
Using react-native and applying Covid-19 API to display cases about 5 majoir countries(China/US/UK/India/Italy)

## Prerequisite
* Set up React-native Environment: [React-native Doc](https://reactnative.dev/docs/environment-setup)

* Install the react-native-maps sdk 
```sh
npm install react-native-maps --save-exact
```

* Use the [Postman](https://www.postman.com) to add the [Covid-19 API](https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#4b88f773-be9b-484f-b521-bb58dda0315c) in our collection(Use the get method and input param to get the response infomation in Json format)

## Deploy from the Covid-19 api
For example, update the lastest data of the U.S cases.
```sh
fetch('https://api.covid19api.com/total/country/us', requestOptions)
      .then((res)=>res.json())
      .then((data)=> {
        for (let i=0; i<data.length; i++) {
          if (i===data.length-1) {
            this.setState({
            US_Confirmed: data[i]['Confirmed'],
            US_Deaths:data[i]['Deaths'],
            US_Recovered:data[i]['Recovered'],
            US_Active:data[i]['Active']
            });
          }
        }
      })
      .catch(error=>{
        console.error(error)
      });
```      

## Result(.gif)


<div align=center><img width="200" height="300" src="https://github.com/BUEC500C1/covid19-app-Jie1995tbc/blob/master/covidmap.gif"/></div>
