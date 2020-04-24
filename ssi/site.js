document.getElementById("dropdown").addEventListener("click", {
    handleEvent: function (event) {
        document.getElementById("myDropdown").classList.toggle("show");
        if ( ! event.target.matches(".dropbtn") ) {
            let dropdowns = document.getElementsByClassName("dropdown-content");
            for ( let i = 0; i < dropdowns.length; i++ ) {
                let openDropdown = dropdowns[i];
                if ( openDropdown.classList.contains("show") ) openDropdown.classList.remove("show");
            }
        }
    }
} );
