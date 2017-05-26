#target Illustrator

/**
* export multiple PNG's in different sizes
* @author Alexandros Harvey
*/
// Adapted to export an Illustrator file in various sizes by Alexandros Harvey
// based on how to export images as CSS Layers by CarlosCanto

// Refactored & modified for UWP tiles by Mikka Pineda


if (app.documents.length > 0) {
    main();
}
else alert('Cancelled by user');

function main() {
    var document = app.activeDocument;
    var afile = document.fullName;
    var filename = afile.name.split('.')[0];

    var folder = afile.parent.selectDlg("Export as CSS Layers (images only)...");

    if(folder != null)
    {
        var activeABidx = document.artboards.getActiveArtboardIndex();
        var activeAB = document.artboards[activeABidx]; // get active AB
        var abBounds = activeAB.artboardRect;// left, top, right, bottom

        var docBounds = document.visibleBounds;
        activeAB.artboardRect = docBounds;

        var options = new ExportOptionsPNG24();
        options.antiAliasing = true;
        options.transparency = true;
        options.artBoardClipping = true;

        var icons = [
// Wide 310x150 Logo
            {"name": "Wide310x150Logo", "width":310, "height":150, "scale":100, "ratio":150/310},
            {"name": "Wide310x150Logo.scale-400", "width":1240, "height":600, "scale":400, "ratio":150/310},
            {"name": "Wide310x150Logo.scale-200", "width":620, "height":300, "scale":200, "ratio":150/310},
            {"name": "Wide310x150Logo.scale-100", "width":310, "height":150, "scale":100, "ratio":150/310},
            {"name": "Wide310x150Logo.scale-150", "width":465, "height":225, "scale":150, "ratio":150/310},
            {"name": "Wide310x150Logo.scale-125", "width":388, "height":188, "scale":125, "ratio":150/310},
// Splash screen
            {"name": "SplashScreen", "width":620, "height":300, "scale":100, "ratio":620/300},
            {"name": "SplashScreen.scale-400", "width":2480, "height":1200, "scale":400, "ratio":620/300},
            {"name": "SplashScreen.scale-200", "width":1240, "height":600, "scale":200, "ratio":620/300},
            {"name": "SplashScreen.scale-150", "width":930, "height":450, "scale":150, "ratio":620/300},
            {"name": "SplashScreen.scale-125", "width":775, "height":375, "scale":125, "ratio":620/300},
            {"name": "SplashScreen.scale-100", "width":620, "height":300, "scale":100, "ratio":620/300}
        ];

        var icon, file;
        for(var i = 0; i < icons.length; i++)
        {
            icon = icons[i];

            file = new File(folder.fsName + '/' + icon.name + ".png");

              options.horizontalScale = 100 * (icon.width / document.width);
              options.verticalScale = 100 * (icon.height / document.height);

              document.exportFile(file,ExportType.PNG24,options);
        }

        activeAB.artboardRect = abBounds;
    }
}
