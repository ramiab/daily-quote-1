/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var QUOTES = [
{"text":"מה שקורה הוא שחייב לקרות. הסוף תמיד טוב. ", "url":"http://www.y-dat.co.il/191001/%D7%AA%D7%A9%D7%95%D7%91%D7%95%D7%AA"},
{"text":"לחשוב אמת, לדבר אמת, לעשות אמת ולהמשיך ולהתקדם, ללא גאווה. ", "url":"http://www.y-dat.co.il/191001/%D7%AA%D7%A9%D7%95%D7%91%D7%95%D7%AA"},
{"text":"מסלקים את המלאכותי, הלא אמיתי וחושפים את הטבעי, האמיתי - בעזרת נושא ההתבוננות. ", "url":"http://www.y-dat.co.il/191001/%D7%AA%D7%A9%D7%95%D7%91%D7%95%D7%AA"},
{"text":'"התבוננות לא טובה" - התבוננות שלא קוימה. ', "url":"http://www.y-dat.co.il/191001/%D7%AA%D7%A9%D7%95%D7%91%D7%95%D7%AA"},
{"text":"אל תבכה ואל תרחם על עצמך. חשוף את החדווה, המאירה בלבך בכל עת תמיד. ", "url":"http://www.y-dat.co.il/191001/%D7%AA%D7%A9%D7%95%D7%91%D7%95%D7%AA"},
];

var app = new function() {
    this.quotesHistory = [];    
    that = this;
    this.getRandomIndex = function() {
        return Math.floor(Math.random() * QUOTES.length); 
    }

    this.getRandomQuote = function() {
        var rand = null;
        if( that.quotesHistory.length == 0 ){
            rand = that.getRandomIndex();
        }
        else {
            var len = that.quotesHistory.length;
            var lastRand = that.quotesHistory[len-1];
            while (  !rand || rand == lastRand ){
                    rand = that.getRandomIndex();    
            }
        }
        that.quotesHistory[that.quotesHistory.length] = rand;
        return QUOTES[rand];
    };

    this.displayQuote = function(quoteObj) {
        $("#the-quote").text(quoteObj['text']);
        $("#the-quote-link").attr("href", quoteObj['url']);
    };

    this.displayRandomQuote = function() {
        var quoteObj = that.getRandomQuote();
        return that.displayQuote(quoteObj);
    };

    // Application Constructor
    this.initialize = function() {
        alert("STARTING...");
        that.bindEvents();
        that.displayRandomQuote();

    };


    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    this.bindEvents = function() {
        document.addEventListener('deviceready', that.onDeviceReady, false);

        $('#next').click(function(){
            that.displayRandomQuote();
        });
        $('#previous').click(function(){
            if( that.quotesHistory == null || that.quotesHistory.length<=1 ){
                return;
            }
            that.quotesHistory.pop();
            var lastQuoteNum = that.quotesHistory[that.quotesHistory.length-1];
            var quote = QUOTES[lastQuoteNum]
            that.displayQuote(quote);
        });
    };

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    this.onDeviceReady = function() {
        app.receivedEvent('deviceready');
        alert("DEVICE IS READY...");

        alert("1");
        window.plugin.notification.local.add({ message: 'Great app!' });
        alert("2");
        var now                  = new Date().getTime(),
        _60_seconds_from_now = new Date(now + 60*1000);

        window.plugin.notification.local.add({
        id:      1, // is converted to a string
        title:   'Reminder',
        message: 'Dont forget to buy some flowers.',
        repeat:  'weekly',
        date:    _60_seconds_from_now
        });
        alert("3");
    };

    // Update DOM on a Received Event
    this.receivedEvent = function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
