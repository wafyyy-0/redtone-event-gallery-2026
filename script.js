/* =========================================================
   REDTONE 2026
   EVENT FILMSTRIP GALLERY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           1. DATA SOURCE

           TEMPORARY PROTOTYPE DATA

           Later replace this section with the URL/API
           supplied by the REDtone website developer.
        ===================================================== */

        const galleryData = {

            1: [
                "images/day1/photo-01.png",
                "images/day1/photo-02.png",
                "images/day1/photo-03.png",
                "images/day1/photo-04.png",
                "images/day1/photo-05.png",
                "images/day1/photo-06.png"
            ],

            2: [],

            3: [],

            4: [],

            5: [],

            6: []
        };



        /* =====================================================
           2. ELEMENTS
        ===================================================== */

        const filmTrack =
            document.getElementById(
                "filmTrack"
            );

        const currentDayLabel =
            document.getElementById(
                "currentDayLabel"
            );

        const description =
            document.getElementById(
                "filmstripDescription"
            );

        const filters =
            document.querySelectorAll(
                ".day-filter"
            );



        /* =====================================================
           3. LIGHTBOX
        ===================================================== */

        const lightbox =
            document.getElementById(
                "photoLightbox"
            );

        const lightboxImage =
            document.getElementById(
                "lightboxImage"
            );

        const lightboxDay =
            document.getElementById(
                "lightboxDay"
            );

        const lightboxCounter =
            document.getElementById(
                "lightboxCounter"
            );

        const closeButton =
            document.getElementById(
                "lightboxClose"
            );

        const previousButton =
            document.getElementById(
                "lightboxPrev"
            );

        const nextButton =
            document.getElementById(
                "lightboxNext"
            );



        /* =====================================================
           4. STATE
        ===================================================== */

        let displayedPhotos = [];

        let currentPhotoIndex = 0;

        let displayedDay = null;



        /* =====================================================
           5. FIND LATEST DAY WITH PHOTOS

           Example:

           Day 1 = photos
           Day 2 = photos
           Day 3 = empty

           Website automatically displays DAY 2.
        ===================================================== */

        function getLatestAvailableDay() {

            let latestDay = 1;

            for (
                let day = 1;
                day <= 6;
                day++
            ) {

                if (
                    galleryData[day] &&
                    galleryData[day].length > 0
                ) {

                    latestDay = day;
                }
            }

            return latestDay;
        }



        /* =====================================================
           6. GET ALL PHOTOS
        ===================================================== */

        function getAllPhotos() {

            const allPhotos = [];

            for (
                let day = 1;
                day <= 6;
                day++
            ) {

                const photos =
                    galleryData[day] || [];

                photos.forEach(
                    function (photo) {

                        allPhotos.push({
                            src: photo,
                            day: day
                        });

                    }
                );
            }

            return allPhotos;
        }



        /* =====================================================
           7. GET PHOTOS FOR ONE DAY
        ===================================================== */

        function getDayPhotos(day) {

            const photos =
                galleryData[day] || [];

            return photos.map(
                function (photo) {

                    return {
                        src: photo,
                        day: day
                    };

                }
            );
        }



        /* =====================================================
           8. RENDER FILMSTRIP
        ===================================================== */

        function renderFilmstrip(
            photos,
            label
        ) {

            if (!filmTrack) {
                return;
            }


            filmTrack.innerHTML = "";


            if (photos.length === 0) {

                filmTrack.innerHTML =
                    `
                    <div class="film-empty">
                        Photos coming soon.
                    </div>
                    `;

                return;
            }


            displayedPhotos = photos;


            /*
               Duplicate the same photos.

               This allows the CSS animation
               to create a seamless infinite loop.
            */

            const loopPhotos = [
                ...photos,
                ...photos
            ];


            loopPhotos.forEach(
                function (photo, index) {

                    const realIndex =
                        index %
                        photos.length;


                    const figure =
                        document.createElement(
                            "figure"
                        );

                    figure.className =
                        "film-photo";


                    const image =
                        document.createElement(
                            "img"
                        );


                    image.src =
                        photo.src;

                    image.alt =
                        `REDtone 2026 Day ${photo.day} tournament photo`;

                    image.loading =
                        "lazy";


                    figure.appendChild(
                        image
                    );


                    figure.addEventListener(
                        "click",
                        function () {

                            openLightbox(
                                realIndex
                            );
                        }
                    );


                    filmTrack.appendChild(
                        figure
                    );

                }
            );


            if (currentDayLabel) {

                currentDayLabel.textContent =
                    label;
            }
        }



        /* =====================================================
           9. SHOW LATEST DAY
        ===================================================== */

        function showLatestDay() {

            const latestDay =
                getLatestAvailableDay();


            displayedDay =
                latestDay;


            const photos =
                getDayPhotos(
                    latestDay
                );


            renderFilmstrip(
                photos,
                `DAY ${latestDay}`
            );


            if (description) {

                description.textContent =
                    `Showing the latest uploaded moments from Day ${latestDay}`;
            }
        }



        /* =====================================================
           10. SHOW SPECIFIC DAY
        ===================================================== */

        function showDay(day) {

            displayedDay = day;


            const photos =
                getDayPhotos(day);


            renderFilmstrip(
                photos,
                `DAY ${day}`
            );


            if (description) {

                if (photos.length > 0) {

                    description.textContent =
                        `Showing tournament moments from Day ${day}`;

                } else {

                    description.textContent =
                        `Day ${day} photos have not been uploaded yet`;
                }
            }
        }



        /* =====================================================
           11. SHOW ALL DAYS
        ===================================================== */

        function showAllDays() {

            displayedDay =
                "all";


            const photos =
                getAllPhotos();


            renderFilmstrip(
                photos,
                "ALL DAYS"
            );


            if (description) {

                description.textContent =
                    "Showing tournament moments from all available days";
            }
        }



        /* =====================================================
           12. FILTER BUTTONS
        ===================================================== */

        filters.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        filters.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );


                        const filter =
                            button.dataset.filter;


                        if (
                            filter ===
                            "latest"
                        ) {

                            showLatestDay();

                            return;
                        }


                        if (
                            filter ===
                            "all"
                        ) {

                            showAllDays();

                            return;
                        }


                        showDay(
                            Number(filter)
                        );

                    }
                );

            }
        );



        /* =====================================================
           13. OPEN LIGHTBOX
        ===================================================== */

        function openLightbox(index) {

            if (
                !lightbox ||
                displayedPhotos.length === 0
            ) {
                return;
            }


            currentPhotoIndex =
                index;


            updateLightbox();


            lightbox.classList.add(
                "active"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";
        }



        /* =====================================================
           14. UPDATE LIGHTBOX
        ===================================================== */

        function updateLightbox() {

            const photo =
                displayedPhotos[
                    currentPhotoIndex
                ];


            if (!photo) {
                return;
            }


            lightboxImage.src =
                photo.src;


            lightboxDay.textContent =
                `DAY ${photo.day}`;


            lightboxCounter.textContent =
                `${String(
                    currentPhotoIndex + 1
                ).padStart(2, "0")} / ${String(
                    displayedPhotos.length
                ).padStart(2, "0")}`;
        }



        /* =====================================================
           15. NEXT PHOTO
        ===================================================== */

        function nextPhoto() {

            currentPhotoIndex++;


            if (
                currentPhotoIndex >=
                displayedPhotos.length
            ) {

                currentPhotoIndex = 0;
            }


            updateLightbox();
        }



        /* =====================================================
           16. PREVIOUS PHOTO
        ===================================================== */

        function previousPhoto() {

            currentPhotoIndex--;


            if (
                currentPhotoIndex < 0
            ) {

                currentPhotoIndex =
                    displayedPhotos.length - 1;
            }


            updateLightbox();
        }



        /* =====================================================
           17. CLOSE LIGHTBOX
        ===================================================== */

        function closeLightbox() {

            lightbox.classList.remove(
                "active"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style.overflow =
                "";
        }



        /* =====================================================
           18. LIGHTBOX BUTTONS
        ===================================================== */

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeLightbox
            );
        }


        if (nextButton) {

            nextButton.addEventListener(
                "click",
                nextPhoto
            );
        }


        if (previousButton) {

            previousButton.addEventListener(
                "click",
                previousPhoto
            );
        }



        /* =====================================================
           19. LIGHTBOX KEYBOARD
        ===================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    !lightbox.classList.contains(
                        "active"
                    )
                ) {
                    return;
                }


                if (
                    event.key ===
                    "Escape"
                ) {

                    closeLightbox();
                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    nextPhoto();
                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    previousPhoto();
                }

            }
        );



        /* =====================================================
           20. INITIALIZE

           Automatically show latest day
           that currently contains photos.
        ===================================================== */

        showLatestDay();


        console.log(
            "REDtone 2026 Event Filmstrip loaded."
        );

    }
);