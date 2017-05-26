#target Illustrator

/**
* export multiple PNG's in different sizes
* @author Alexandros Harvey
*/
// Adapted to export an Illustrator file in various sizes by Alexandros Harvey
// based on how to export images as CSS Layers by CarlosCanto

// Refactored & modified for UWP tiles (recommended sizes) by Mikka Pineda


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
// Sqaure 71x71 Logo
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
            {"name": "Square44x44Logo.targetsize-16-unplated", "size":16},
// Store Logo
            {"name": "StoreLogo", "size":50},
            {"name": "StoreLogo.scale-400", "size":200},
            {"name": "StoreLogo.scale-200", "size":100},
            {"name": "StoreLogo.scale-150", "size":75},
            {"name": "StoreLogo.scale-125", "size":63}
        ];

        var icon, file;
        for(var i = 0; i < icons.length; i++)
        {
            icon = icons[i];

            file = new File(folder.fsName + '/' + icon.name + ".png");

            // My App Icon is originally 1024x1024 so that's why I divide height and width by 1024
            options.horizontalScale = 100 * (icon.size / document.width);
            options.verticalScale = 100 * (icon.size / document.height);

            document.exportFile(file,ExportType.PNG24,options);
        }

        activeAB.artboardRect = abBounds;
    }
}
