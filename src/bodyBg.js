var setBackground = function(dotColor, backgroundColor, dotRadius, dotSpacing){
    
    var image = 'radial-gradient(circle, '+dotColor+' '+dotRadius+'px, '+backgroundColor+' 0px)';

    var size = dotSpacing+'px '+dotSpacing+'px';

    document.body.style.backgroundImage = image;
    document.body.style.backgroundSize = size;
};

export default { setBackground };