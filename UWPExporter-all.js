#target Illustrator

// Exports active Illustrator artboard into PNGs scaled to all UWP Tile Sizes (except Badge Icon sizes)
// Refactored & modified for UWP tile assets by Mikka Pineda
// Based on "Multiexporter" by Alexandros Harvey and "Export Images as CSS Layers" by Carlos Canto


if (app.documents.length > 0) {
    main();
}
else alert('There are no active objects! Export cancelled.');

function main() {
    var document = app.activeDocument;
    var afile = document.fullName;
    var filename = afile.name.split('.')[0];

    var folder = afile.parent.selectDlg("Export as PNGs");

    if(folder != null)
    {
        var activeArtboardIndex = document.artboards.getActiveArtboardIndex();
        var activeArtboard = document.artboards[activeArtboardIndex]; // get active AB
        var artboardBounds = activeArtboard.artboardRect;// left, top, right, bottom

        var documentBounds = document.visibleBounds;
        activeArtboard.artboardRect = documentBounds;

        var options = new ExportOptionsPNG24();
        options.antiAliasing = true;
        options.transparency = true;
        options.artBoardClipping = true;

        var iconsWide = [
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

        var iconsSquare = [
// Store Logo
            {"name": "StoreLogo", "size":50},
            {"name": "StoreLogo.scale-400", "size":200},
            {"name": "StoreLogo.scale-200", "size":100},
            {"name": "StoreLogo.scale-150", "size":75},
            {"name": "StoreLogo.scale-125", "size":63},
// Square 71x71 Logo
            {"name": "Square71x71Logo", "size":71},
            {"name": "Square71x71Logo.scale-400", "size":284},
            {"name": "Square71x71Logo.scale-200", "size":142},
            {"name": "Square71x71Logo.scale-100", "size":71},
            {"name": "Square71x71Logo.scale-150", "size":107},
            {"name": "Square71x71Logo.scale-125", "size":89},
// Square 150x150 Logo
            {"name": "Square150x150Logo", "size":150},
            {"name": "Square150x150Logo.scale-400", "size":600},
            {"name": "Square150x150Logo.scale-200", "size":300},
            {"name": "Square150x150Logo.scale-100", "size":150},
            {"name": "Square150x150Logo.scale-150", "size":225},
            {"name": "Square150x150Logo.scale-125", "size":188},
// Sqaure 310x310 Logo
            {"name": "Square310x310Logo", "size":310},
            {"name": "Square310x310Logo.scale-400", "size":1240},
            {"name": "Square310x310Logo.scale-200", "size":620},
            {"name": "Square310x310Logo.scale-100", "size":310},
            {"name": "Square310x310Logo.scale-150", "size":465},
            {"name": "Square310x310Logo.scale-125", "size":388},
// Square 44x44 Logo
            {"name": "Square44x44Logo", "size":44},
            {"name": "Square44x44Logo.scale-400", "size":176},
            {"name": "Square44x44Logo.scale-200", "size":88},
            {"name": "Square44x44Logo.scale-100", "size":44},
            {"name": "Square44x44Logo.scale-150", "size":66},
            {"name": "Square44x44Logo.scale-125", "size":55},
// Square 44x44 Logo Target Size
            {"name": "Square44x44Logo.targetsize-256", "size":256},
            {"name": "Square44x44Logo.targetsize-48", "size":48},
            {"name": "Square44x44Logo.targetsize-24", "size":24},
            {"name": "Square44x44Logo.targetsize-16", "size":16},
// Square 44x44 Logo Target Size Unplated
            {"name": "Square44x44Logo.targetsize-256-unplated", "size":256},
            {"name": "Square44x44Logo.targetsize-48-unplated", "size":48},
            {"name": "Square44x44Logo.targetsize-24-unplated", "size":24},
            {"name": "Square44x44Logo.targetsize-16-unplated", "size":16}
        ];

        var icon, file;

// Export Wide PNGs
        if (artboardBounds[0] != artboardBounds[1]) {
          for(var i = 0; i < iconsWide.length; i++)
          {
              icon = iconsWide[i];

              file = new File(folder.fsName + '/' + icon.name + ".png");

              options.horizontalScale = 100 * (icon.width / document.width);
              options.verticalScale = 100 * (icon.height / document.height);

              document.exportFile(file,ExportType.PNG24,options);
          }
        }

// Export Square PNGs
        if (artboardBounds[0] == artboardBounds[1]) {
          for(var i = 0; i < iconsSquare.length; i++)
          {
              icon = iconsSquare[i];

              file = new File(folder.fsName + '/' + icon.name + ".png");

              options.horizontalScale = 100 * (icon.size / document.width);
              options.verticalScale = 100 * (icon.size / document.height);

              document.exportFile(file,ExportType.PNG24,options);
          }
        }

        activeArtboard.artboardRect = artboardBounds;
    }
}
