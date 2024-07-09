function toggleAccordion(index) {
    const contents = document.querySelectorAll('.accordion-content');
    contents.forEach((content, i) => {
        if (i === index) {
            content.classList.toggle('active');
        } else {
            content.classList.remove('active');
        }
    });
}

jQuery(document).ready(function() {
    jQuery(".d4c6906c9d721da8ea7c6972ff67f5e0").click(function() {
        jQuery.post(
            "https://oceansofgamess.com/wp-admin/admin-ajax.php", {
                "action": "quick_adsense_onpost_ad_click",
                "quick_adsense_onpost_ad_index": jQuery(this).attr("data-index"),
                "quick_adsense_nonce": "dd857c315a",
            }, function(response) { }
        );
    });
});
