// identify footage used in comps
// turns used footage orange
// turns unused footage purple

var comps = getComps();
var footageItems = getFootage();
identifyUsedFootage(comps, footageItems);

function identifyUsedFootage(comps, footages) {
    app.beginUndoGroup("Identify Used Footage");
    for(var i = 0; i < comps.length; i++) {
        // loop thru comp layers
        for(var l = 1; l <= comps[i].numLayers; l++) {
            // if layer has a source
            if(comps[i].layer(l).source) {
                // loop thru footageItems and simply compare each one to see if it exists
                for(var f = 0; f < footages.length; f++) {
                    if(comps[i].layer(l).source == footages[f]) {
                            comps[i].layer(l).source.label = 11;
                        }
                    }
                }
            }
        }
    
    // now that we've gone thru all of our footage, lets loop thru our footageItems
    // if any of the footage labels are not orange (used), we will turn them purple (indicating they are unused)
    for(var i = 0; i < footages.length; i++) {
        if(footages[i].label != 11) {
            footages[i].label = 10;
            }
        }
    
    app.endUndoGroup();
    }

function getComps() {
        var array = [];
        for(var i = 1; i <= app.project.numItems; i++) {
            if(app.project.item(i) instanceof CompItem) {
                array.push(app.project.item(i));
                }
            }
        return array;
    }

function getFootage() {
        var array = [];
        
        for(var i = 1; i <= app.project.numItems; i++) {
            if(app.project.item(i).mainSource) {
                if(app.project.item(i).mainSource.file) {
                    array.push(app.project.item(i));
                    }
                }
            }
        return array;
    }
