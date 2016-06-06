$(function() {

    $('#scotch-panel').scotchPanel({
        containerSelector: 'body',
        direction: 'right',
        duration: 300,
        transition: 'ease',
        clickSelector: '.toggle-panel',
        distanceX: '70%',
        enableEscapeKey: true
    });

});