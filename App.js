import React, { Component }from 'react';
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  Text,
  Dimensions,
  Switch,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE, ProviderPropType } from 'react-native-maps';

const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';
const {width, height} = Dimensions.get('window');
const ratio = width/height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ratio;




export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
          latitude: 51.705538,
          longitude:  -0.141195,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      region: {
        China: {
          longitude: 116.409,
          latitude:39.915378
        },

        US: {
          longitude:-77.032440,
          latitude:38.906338
        },

        India: {
          longitude:77.211720,
          latitude:28.626774
        },

        UK: {
          longitude:-0.141195,
          latitude:51.705538
        },

        Italy: {
          longitude:12.322749,
          latitude:45.435046
        }
      },

        NewConfirmed: ' ',
        TotalConfirmed: ' ',
        NewDeaths: '',
        TotalDeaths: '',
        NewRecovered: '',
        TotalRecovered: '',

     
        CHN_Confirmed:'',
        CHN_Deaths:'',
        CHN_Recovered:'',
        CHN_Active:'',

        US_Confirmed:'',
        US_Deaths:'',
        US_Recovered:'',
        US_Active:'',

        India_Confirmed:'',
        India_Deaths:'',
        India_Recovered:'',
        India_Active:'',

        Italy_Confirmed:'',
        Italy_Deaths:'',
        Italy_Recovered:'',
        Italy_Active:'',

        UK_Confirmed:'',
        UK_Deaths:'',
        UK_Recovered:'',
        UK_Active:'',

    };
  }


  componentDidMount(){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    // Summary cases
    fetch('https://api.covid19api.com/summary', requestOptions)
      .then((res) => res.json())
      .then((data)=> {
          this.setState({
          TotalConfirmed: data["Global"]["TotalConfirmed"],
          TotalRecovered: data["Global"]['TotalRecovered'],
          TotalDeaths: data["Global"]["TotalDeaths"],
          NewConfirmed: data["Global"]['NewConfirmed'],
          NewRecovered: data["Global"]['NewRecovered'],
          NewDeaths: 2,
      });
      })
      .catch(error=>{
        console.error(error)
      });

    // Case of China
    fetch('https://api.covid19api.com/total/country/china', requestOptions)
      .then((res)=>res.json())
      .then((data)=> {
        for (let i=0; i<data.length; i++) {
          if (i===data.length-1) {
            this.setState({
            CHN_Confirmed: data[i]['Confirmed'],
            CHN_Deaths:data[i]['Deaths'],
            CHN_Recovered:data[i]['Recovered'],
            CHN_Active:data[i]['Active']
            });
          }
        }
      })
      .catch(error=>{
        console.error(error)
      });

    // Case of US
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

    // Case of India
    fetch('https://api.covid19api.com/total/country/india', requestOptions)
      .then((res)=>res.json())
      .then((data)=> {
        for (let i=0; i<data.length; i++) {
          if (i===data.length-1) {
            this.setState({
            India_Confirmed: data[i]['Confirmed'],
            India_Deaths:data[i]['Deaths'],
            India_Recovered:data[i]['Recovered'],
            India_Active:data[i]['Active']
            });
          }
        }
      })
      .catch(error=>{
        console.error(error)
      });

    // Case of Italy
    fetch('https://api.covid19api.com/total/country/italy', requestOptions)
      .then((res)=>res.json())
      .then((data)=> {
        for (let i=0; i<data.length; i++) {
          if (i===data.length-1) {
            this.setState({
            Italy_Confirmed: data[i]['Confirmed'],
            Italy_Deaths:data[i]['Deaths'],
            Italy_Recovered:data[i]['Recovered'],
            Italy_Active:data[i]['Active']
            });
          }
        }
      })
      .catch(error=>{
        console.error(error)
      });

    // Case of UK
    fetch('https://api.covid19api.com/total/country/united%20kingdom', requestOptions)
      .then((res)=>res.json())
      .then((data)=> {
        for (let i=0; i<data.length; i++) {
          if (i===data.length-1) {
            this.setState({
            UK_Confirmed: data[i]['Confirmed'],
            UK_Deaths:data[i]['Deaths'],
            UK_Recovered:data[i]['Recovered'],
            UK_Active:data[i]['Active']
            });
          }
        }
      })
      .catch(error=>{
        console.error(error)
      });
    }



    render() {
      const {location} = this.state;
      console.log(this.state.CHN_Confirmed)

      return (
        <MapView
          zoomEnabled
          zoomControlEnabled
          style ={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={location}>


          <Marker
            coordinate={this.state.region.China}>
            <Callout>
              <Text> China</Text>
              <Text> Confirmed:{this.state.CHN_Confirmed} </Text>
              <Text> Recovered:{this.state.CHN_Recovered} </Text>
              <Text> Active:{this.state.CHN_Active} </Text>
              <Text> Deaths:{this.state.CHN_Deaths} </Text>
            </Callout>
          </Marker>

          <Marker
            coordinate={this.state.region.UK}>
            <Callout>
              <Text> United Kingdoms</Text>
              <Text> Confirmed:{this.state.UK_Confirmed} </Text>
              <Text> Recovered:{this.state.UK_Recovered} </Text>
              <Text> Active:{this.state.UK_Active} </Text>
              <Text> Deaths:{this.state.UK_Deaths} </Text>
            </Callout>
          </Marker>

          <Marker
            coordinate={this.state.region.US}>
            <Callout>
              <Text> US</Text>
              <Text> Confirmed:{this.state.US_Confirmed} </Text>
              <Text> Recovered:{this.state.US_Recovered} </Text>
              <Text> Active:{this.state.US_Active} </Text>
              <Text> Deaths:{this.state.US_Deaths} </Text>
            </Callout>
          </Marker>

          <Marker
            coordinate={this.state.region.Italy}>
            <Callout>
              <Text> Italy</Text>
              <Text> Confirmed:{this.state.Italy_Confirmed} </Text>
              <Text> Recovered:{this.state.Italy_Recovered} </Text>
              <Text> Active:{this.state.Italy_Active} </Text>
              <Text> Deaths:{this.state.Italy_Deaths} </Text>
            </Callout>
          </Marker>

          <Marker
            coordinate={this.state.region.India}>
            <Callout>
              <Text> India</Text>
              <Text> Confirmed:{this.state.India_Confirmed} </Text>
              <Text> Recovered:{this.state.India_Recovered} </Text>
              <Text> Active:{this.state.India_Active} </Text>
              <Text> Deaths:{this.state.India_Deaths} </Text>
            </Callout>
          </Marker>
        </MapView>
        );
      }
    }

 







const styles = StyleSheet.create({
  
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  button: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'rgba(220,220,220,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: 12,
    borderRadius: 20,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
   ...StyleSheet.absoluteFillObject,
  },
  backButton: { fontWeight: 'bold', fontSize: 30 },
  googleSwitch: { marginBottom: 10 },
});

/// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// import React from 'react';
// import {
//   Platform,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Text,
//   Switch,
// } from 'react-native';
// const styles = StyleSheet.create({
//  container: {
//    ...StyleSheet.absoluteFillObject,
//    height: 400,
//    width: 400,
//    justifyContent: 'flex-end',
//    alignItems: 'center',
//  },
//  map: {
//    ...StyleSheet.absoluteFillObject,
//  },
// });

// export default () => (
//    <View style={styles.container}>
//      <MapView
//        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//        style={styles.map}
//        region={{
//          latitude: 37.78825,
//          longitude: -122.4324,
//          latitudeDelta: 0.015,
//          longitudeDelta: 0.0121,
//        }}
//      >
//      </MapView>
//    </View>
// );
