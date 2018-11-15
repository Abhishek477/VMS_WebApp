demo = {
  initPickColor: function() {
    $('.pick-class-label').click(function() {
      var new_class = $(this).attr('new-class');
      var old_class = $('#display-buttons').attr('data-class');
      var display_div = $('#display-buttons');
      if (display_div.length) {
        var display_buttons = display_div.find('.btn');
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr('data-class', new_class);
      }
    });
  },

  initDocChart: function() {
    chartColor = "#FFFFFF";

    // General configuration for the charts with Line gradientStroke
    gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    ctx = document.getElementById('lineChartExample').getContext("2d");

    gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, chartColor);

    gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    myChart = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Active Users",
          borderColor: "#f96332",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#f96332",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]
        }]
      },
      options: gradientChartOptionsConfiguration
    });
  },

  initDashboardPageCharts: function() {

    chartColor = "#FFFFFF";

    // General configuration for the charts with Line gradientStroke
    gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    gradientChartOptionsConfigurationWithNumbersAndGrid = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: 0,
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };



    function fineSum(){
      var mnt = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      
      var keys,sumFine = 0;
      var fineArr = [0,0,0,0,0,0,0,0,0,0,0,0];

      for(var i = 0; i < 12; i++){
        var refDB = db.ref("Registration/" + userId1 + "/Fine/y2018/" + mnt[i]);
        refDB.on("value", function(snapshot) {
          var chartData = snapshot.val();
          keys = Object.keys(chartData);
        });
        for(var j = 0; j < keys.length; j++){
          refDB = db.ref("Registration/" + userId1 + "/Fine/y2018/" + mnt[i] + "/" + keys[j]);
          
          refDB.on("value", function(snapshot) {
            var chartData = snapshot.val();
            sumFine += chartData.Amount;
          });
        }
        fineArr[i] = sumFine;
        sumFine = 0;
      }
      return fineArr;
    }






    // window.alert(db.ref("Registration/" + window.btoa("qw")).update({ggwp : "csgo"}));
    var userId1 = localStorage['objectToPass'];
    var refDB = db.ref("Registration/" + userId1 + "/Fine/y2018");
    var chartData, dataArr, monthsArr = ["JAN-18", "FEB-18", "MAR-18", "APR-18", "MAY-18", "JUN-18", "JUL-18", "AUG-18", "SEP-18", "OCT-18", "NOV-18", "DEC-18"];

    refDB.on("value", function(snapshot) {
      chartData = snapshot.val();

      var preloader = $('.spinner-wrapper');
      preloader.fadeOut(500);

      var ctx = document.getElementById('bigDashboardChart');
      if(ctx){
        dataArr = fineSum();
        console.log(dataArr);
        ctx = ctx.getContext("2d");

        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#80b6f4');
        gradientStroke.addColorStop(1, chartColor);

        var gradientFill = ctx.createLinearGradient(0, 170, 10, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.7));
        
  
        var a = {
          type: "bar",
          data: {
            labels: monthsArr,
            datasets: [{
              label: "Fine (INR)",
              backgroundColor: gradientFill,
              borderColor: "#2CA8FF",
              pointBorderColor: "#FFF",
              pointBackgroundColor: "#2CA8FF",
              pointBorderWidth: 2,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 1,
              pointRadius: 4,
              fill: true,
              borderWidth: 1,
              data: dataArr
            }]
          },
          options: {
            layout: {
              padding: {
                left: 20,
                right: 20,
                top: 0,
                bottom: 0
              }
            },
            maintainAspectRatio: false,
            tooltips: {
              backgroundColor: '#fff',
              titleFontColor: '#333',
              bodyFontColor: '#666',
              bodySpacing: 4,
              xPadding: 12,
              mode: "nearest",
              intersect: 0,
              position: "nearest"
            },
            legend: {
              position: "bottom",
              fillStyle: "#FFF",
              display: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  fontColor: "rgba(255,255,255,0.4)",
                  fontStyle: "bold",
                  beginAtZero: true,
                  maxTicksLimit: 5,
                  padding: 10
                },
                gridLines: {
                  drawTicks: true,
                  drawBorder: false,
                  display: true,
                  color: "rgba(255,255,255,0.1)",
                  zeroLineColor: "transparent"
                }
    
              }],
              xAxes: [{
                gridLines: {
                  zeroLineColor: "transparent",
                  display: false,
    
                },
                ticks: {
                  padding: 10,
                  fontColor: "rgba(255,255,255,0.4)",
                  fontStyle: "bold"
                }
              }]
            }
          }
        };
        var viewsChart = new Chart(ctx, a);
      }
    });
  },

  initGoogleMaps: function(lat, lng) {
    var myLatlng = new google.maps.LatLng(lat, lng);//22.5631671,88.3213589);22.555299, 88.307753);
    var mapOptions = {
      zoom: 16,
      center: myLatlng,
      scrollwheel: true, //we disable de scroll over the map, it is a really annoing when you scroll through page
      /*
      styles: [{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#52b9f9"
        }, {
          "lightness": 17
        }]
      }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f5f5"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 17
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 29
        }, {
          "weight": 0.2
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 18
        }]
      }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 16
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f5f5"
        }, {
          "lightness": 21
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dedede"
        }, {
          "lightness": 21
        }]
      }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#ffffff"
        }, {
          "lightness": 16
        }]
      }, {
        "elementType": "labels.text.fill",
        "stylers": [{
          "saturation": 36
        }, {
          "color": "#333333"
        }, {
          "lightness": 40
        }]
      }, {
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f2f2f2"
        }, {
          "lightness": 19
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#fefefe"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#fefefe"
        }, {
          "lightness": 17
        }, {
          "weight": 1.2
        }]
      }]
      */
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
      title: "Hello World!"
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
  },

  showNotification: function(from, align) {
    color = 'primary';

    $.notify({
      icon: "now-ui-icons ui-1_bell-53",
      message: "Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer."

    }, {
      type: color,
      timer: 8000,
      placement: {
        from: from,
        align: align
      }
    });
  }

};



function viewMap(choice){
  switch(choice){
    case 1 : document.getElementById("map").innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.884772305961!2d88.34071371458248!3d22.58341258517723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027795d8ab719b%3A0x45ef375a63fd05f3!2sHowrah!5e0!3m2!1sen!2sin!4v1542135703669" width="1001" height="500" frameborder="0" style="border:0" allowfullscreen></iframe>';
    break;
    case 2 : document.getElementById("map").innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4381.77469520719!2d88.30537273851046!3d22.555954459525577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0279ca2ab768f5%3A0x292cc549d609ade5!2sIIEST+%2C+First+Gate!5e0!3m2!1sen!2sin!4v1542134953885" width="1001" height="500" frameborder="0" style="border:0" allowfullscreen></iframe>';
    break;
    case 3 : document.getElementById("map").innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.4259468915425!2d88.32135891458206!3d22.56316708518762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02782b4b85236b%3A0xf930670bfb37fe43!2sAvani+Riverside+Mall!5e0!3m2!1sen!2sin!4v1542135497083" width="1001" height="500" frameborder="0" style="border:0" allowfullscreen></iframe>';
    break;
    case 4 : document.getElementById("map").innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.0569853930247!2d88.36304231458158!3d22.539537985199846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276de2ae1de37%3A0x60f17500da0e68e9!2sQuest+Mall!5e0!3m2!1sen!2sin!4v1542135736494" width="1001" height="500" frameborder="0" style="border:0" allowfullscreen></iframe>';
    break;
    default : console.log("Invalid choice!");
  }
}