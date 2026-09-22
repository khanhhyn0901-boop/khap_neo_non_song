/* =====================================
   LẤY CÁC PHẦN TỬ HTML
===================================== */

const infoModal = document.getElementById("infoModal");
const closeInfo = document.getElementById("closeInfo");

const infoTitle = document.getElementById("infoTitle");
const infoContent = document.getElementById("infoContent");

const welcomeBox = document.getElementById("welcomeBox");
const guideBox = document.getElementById("guideBox");

const startBtn = document.getElementById("startBtn");
const exploreBtn = document.getElementById("exploreBtn");

const museum = document.getElementById("museum");


/* =====================================
   DINH SCENE
===================================== */

const dinhScene = document.getElementById("dinhScene");
const dinhAreas = document.getElementById("dinhAreas");

const area1 = document.getElementById("area1");
const area2 = document.getElementById("area2");


/* =====================================
   SCROLL SCENE
===================================== */

const exhibitScene = document.getElementById("exhibitScene");
const familyScene = document.getElementById("familyScene");

let currentScrollScene = null;


/* =====================================
   BẾN NHÀ RỒNG
===================================== */

const benScene = document.getElementById("benScene");
const benExploreBtn = document.getElementById("benExploreBtn");


/* =====================================
   TASKBAR
===================================== */

const backBtn = document.getElementById("backBtn");
const sceneInfoBtn = document.getElementById("sceneInfoBtn");

const mapsBtn = document.getElementById("mapsBtn");
const mapsModal = document.getElementById("mapsModal");
const closeMaps = document.getElementById("closeMaps");


/* =====================================
   TRẠNG THÁI
===================================== */

let currentScene = "lobby";
let historyStack = [];


/* =====================================
   THÔNG TIN CÁC KHU
===================================== */

const scenes = {

    dinh: {

        name: "DINH ĐỘC LẬP",

        image: "dinh.png",

        maps:
            "https://www.google.com/maps?q=Dinh+Doc+Lap+Ho+Chi+Minh&output=embed",

        icon: `
            <svg viewBox="0 0 24 24">

                <path d="M3 21h18"></path>

                <path d="M5 21V9"></path>

                <path d="M19 21V9"></path>

                <path d="M3 9h18"></path>

                <path d="M4 9l8-5 8 5"></path>

                <path d="M8 13v4"></path>

                <path d="M12 13v4"></path>

                <path d="M16 13v4"></path>

            </svg>
        `
    },


    ben: {

        name: "BẾN NHÀ RỒNG",

        image: "ben.png",

        nextImage: "ben-inside.png",

        maps:
            "https://www.google.com/maps?q=Ben+Nha+Rong+Ho+Chi+Minh&output=embed",

        icon: `
            <svg viewBox="0 0 24 24">

                <path d="M3 17h18"></path>

                <path d="M5 17l2-4h10l2 4"></path>

                <path d="M9 13V8h6v5"></path>

                <path d="M12 8V4"></path>

                <path d="M10 4h4"></path>

                <path d="M5 20h14"></path>

            </svg>
        `
    },


    diaDao: {

        name: "ĐỊA ĐẠO CỦ CHI",

        image: "diadao.png",

        nextImage: "diadao-inside.png",

        maps:
            "https://www.google.com/maps?q=Cu+Chi+Tunnels+Vietnam&output=embed",

        icon: `
            <svg viewBox="0 0 24 24">

                <path d="M4 20c0-7 3-11 8-11s8 4 8 11"></path>

                <path d="M7 20v-3"></path>

                <path d="M17 20v-3"></path>

                <path d="M9 14h6"></path>

            </svg>
        `
    }

};


/* =====================================
   INTRO
===================================== */

startBtn.addEventListener("click", function () {

    welcomeBox.classList.add("hidden");

    setTimeout(function () {

        welcomeBox.style.display = "none";

        guideBox.classList.remove("hidden");

    }, 900);

});


/* =====================================
   BẮT ĐẦU THAM QUAN
===================================== */

exploreBtn.addEventListener("click", function () {

    guideBox.classList.add("hidden");

    museum.classList.remove("hidden");

    museum.style.display = "block";

    dinhScene.style.display = "none";

    /* ĐÓNG BẾN NẾU ĐANG MỞ */

    if (benScene) {

        benScene.classList.remove("active");

    }

    if (benExploreBtn) {

        benExploreBtn.style.display = "none";

    }

    updateTaskbar();

    setupDoors();

});


/* =====================================
   TẠO TOOLTIP CHO CỬA
===================================== */

function setupDoors() {

    document.querySelectorAll(".door").forEach(door => {

        /* Không tạo tooltip trùng */

        if (
            museum.querySelector(
                `.door-tooltip[data-for="${door.dataset.name}"]`
            )
        ) {
            return;
        }


        /* TẠO TOOLTIP */

        const tooltip =
            document.createElement("div");

        tooltip.className = "door-tooltip";

        tooltip.dataset.for =
            door.dataset.name;

        tooltip.textContent =
            door.dataset.name;

        museum.appendChild(tooltip);


        /* HOVER */

        door.addEventListener("mouseenter", () => {

            const doorRect =
                door.getBoundingClientRect();

            const museumRect =
                museum.getBoundingClientRect();


            tooltip.style.left =
                (
                    doorRect.left -
                    museumRect.left +
                    doorRect.width / 2
                ) + "px";


            tooltip.style.top =
                (
                    doorRect.top -
                    museumRect.top -
                    12
                ) + "px";


            tooltip.classList.add("show");

        });


        door.addEventListener("mouseleave", () => {

            tooltip.classList.remove("show");

        });


        /* CLICK */

        door.addEventListener("click", () => {

            if (door.classList.contains("door1")) {

                openScene("dinh");

            }

            else if (door.classList.contains("door2")) {

                openScene("ben");

            }

            else if (door.classList.contains("door3")) {

                openScene("diaDao");

            }

        });

    });

}


/* =====================================
   MỞ CẢNH
===================================== */

function openScene(sceneName) {

    historyStack.push(currentScene);

    currentScene = sceneName;


    /* FADE */

    document.body.classList.add("fade-out");


    setTimeout(() => {


        /* =================================
           DINH ĐỘC LẬP
        ================================= */

        if (sceneName === "dinh") {

            /* ẨN LOBBY */

            museum.style.display = "none";


            /* ẨN BẾN */

            if (benScene) {

                benScene.classList.remove("active");

            }


            /* HIỆN DINH */

            dinhScene.style.display = "block";


            /* ẨN 2 KHU LÚC ĐẦU */

            dinhAreas.style.display = "none";


            /* CẬP NHẬT TASKBAR */

            updateTaskbar();


            document.body.classList.remove("fade-out");


            /* HIỆN NOTICE */

            setTimeout(() => {

                showNotice(
                    "BẠN ĐANG Ở DINH ĐỘC LẬP",
                    "Chào mừng bạn đến với khu trưng bày Dinh Độc Lập.",
                    "BẮT ĐẦU KHÁM PHÁ"
                );

            }, 500);


            return;

        }


        /* =================================
           BẾN NHÀ RỒNG
        ================================= */

        if (sceneName === "ben") {

            /* ẨN LOBBY */

            museum.style.display = "none";


            /* ẨN DINH */

            dinhScene.style.display = "none";


            /* HIỆN BẾN */

            benScene.classList.add("active");


            /* ẨN CỤC TRÒN LÚC ĐẦU */

            benExploreBtn.style.display = "none";


            /* CẬP NHẬT TASKBAR */

            updateTaskbar();


            document.body.classList.remove("fade-out");


            /* HIỆN NOTICE */

            setTimeout(() => {

                showNotice(
                    "BẠN ĐANG Ở BẾN NHÀ RỒNG",
                    "Chào mừng bạn đến với khu trưng bày Bến Nhà Rồng.",
                    "BẮT ĐẦU KHÁM PHÁ"
                );

            }, 500);


            return;

        }


        /* =================================
           ĐỊA ĐẠO CỦ CHI
        ================================= */

        dinhScene.style.display = "none";


        /* ĐÓNG BẾN */

        if (benScene) {

            benScene.classList.remove("active");

        }


        museum.style.display = "block";


        museum.innerHTML = `

            <div class="scene">

                <img
                    src="${scenes[sceneName].image}"
                    alt="${scenes[sceneName].name}">


                ${
                    sceneName === "diaDao"
                    ? `
                        <button
                            class="scene-hotspot diaDao-hotspot"
                            id="diaDaoHotspot">
                        </button>
                    `
                    : ""
                }

            </div>

        `;


        document.body.classList.remove("fade-out");


        /* CẬP NHẬT TASKBAR */

        updateTaskbar();


        /* =================================
           THÔNG BÁO ĐỊA ĐẠO
        ================================= */

        setTimeout(() => {

            if (sceneName === "diaDao") {

                showNotice(
                    "BẠN ĐANG Ở ĐỊA ĐẠO CỦ CHI",
                    "Chào mừng bạn đến với khu di tích Địa đạo Củ Chi.",
                    "BẮT ĐẦU KHÁM PHÁ"
                );

            }

        }, 500);


        /* =================================
           NÚT ĐỊA ĐẠO
        ================================= */

        if (sceneName === "diaDao") {

            const diaDaoHotspot =
                document.getElementById("diaDaoHotspot");


            if (diaDaoHotspot) {

                diaDaoHotspot.addEventListener("click", () => {

                    openNextScene("diaDao");

                });

            }

        }


    }, 500);

}


/* =====================================
   CHUYỂN SANG SCENE TIẾP THEO
===================================== */

function openNextScene(sceneName) {

    document.body.classList.add("fade-out");


    setTimeout(() => {

        const scene =
            document.querySelector(".scene");


        if (!scene) return;


        scene.innerHTML = `

            <img
                src="${scenes[sceneName].nextImage}"
                alt="${scenes[sceneName].name}">

        `;


        document.body.classList.remove("fade-out");

    }, 500);

}


/* =====================================
   HIỆN BẢNG THÔNG BÁO
===================================== */

function showNotice(title, text, buttonText) {

    const notice =
        document.createElement("div");


    notice.className = "notice";


    notice.innerHTML = `

        <div class="notice-box">

            <h2>${title}</h2>

            <p>${text}</p>

            <button id="noticeStartBtn">
                ${buttonText}
            </button>

        </div>

    `;


    document.body.appendChild(notice);


    const noticeStartBtn =
        notice.querySelector("#noticeStartBtn");


    /* =================================
       BẮT ĐẦU KHÁM PHÁ
    ================================= */

    noticeStartBtn.addEventListener("click", () => {

        notice.classList.add("notice-hide");


        setTimeout(() => {

            notice.remove();


            /* =================================
               DINH
            ================================= */

            if (currentScene === "dinh") {

                showDinhAreas();

            }


            /* =================================
               BẾN NHÀ RỒNG
            ================================= */

            if (currentScene === "ben") {

                benExploreBtn.style.display = "flex";

            }

        }, 400);

    });

}


/* =====================================
   HIỆN 2 KHU DINH ĐỘC LẬP
===================================== */

function showDinhAreas() {

    if (!dinhAreas) return;

    dinhAreas.style.display = "flex";

}


/* =====================================
   TASKBAR
===================================== */

function updateTaskbar() {

    /* LOBBY */

    if (currentScene === "lobby") {

        sceneInfoBtn.style.display = "none";

        return;

    }


    /* CÁC ĐỊA DANH */

    const scene =
        scenes[currentScene];


    if (!scene) return;


    sceneInfoBtn.style.display = "flex";


    sceneInfoBtn.innerHTML =
        scene.icon;


    sceneInfoBtn.title =
        scene.name;

}


/* =====================================
   NÚT BACK
===================================== */

backBtn.addEventListener("click", function () {


    /* =================================
       ĐANG Ở KHU CON CỦA DINH
    ================================= */

    if (currentScrollScene) {

        exhibitScene.classList.remove("active");

        familyScene.classList.remove("active");

        currentScrollScene = null;

        dinhAreas.style.display = "flex";

        return;

    }


    /* =================================
       ĐANG Ở ĐỊA DANH
    ================================= */

    if (
        currentScene === "dinh" ||
        currentScene === "ben" ||
        currentScene === "diaDao"
    ) {

        goBackToLobby();

    }

});


/* =====================================
   QUAY VỀ SẢNH
===================================== */

function goBackToLobby() {

    /* ĐÓNG INFO */

    infoModal.classList.remove("show");


    /* ĐÓNG DINH */

    dinhScene.style.display = "none";


    /* ĐÓNG BẾN */

    benScene.classList.remove("active");


    /* ẨN CỤC BẾN */

    benExploreBtn.style.display = "none";


    /* ẨN 2 KHU DINH */

    dinhAreas.style.display = "none";


    /* ĐỔI TRẠNG THÁI */

    currentScene = "lobby";


    /* HIỆN LẠI LOBBY */

    museum.style.display = "block";

    museum.classList.remove("hidden");


    /* RESET LOBBY */

    museum.innerHTML = `

        <img
            src="bgr.png"
            class="background"
            alt="Bảo tàng KHẮP NẺO NON SÔNG">


        <img
            src="door1-dinh.png"
            class="door door1"
            data-name="DINH ĐỘC LẬP"
            alt="Dinh Độc Lập">


        <img
            src="door2-bencang.png"
            class="door door2"
            data-name="BẾN NHÀ RỒNG"
            alt="Bến Nhà Rồng">


        <img
            src="door3-diadao.png"
            class="door door3"
            data-name="ĐỊA ĐẠO CỦ CHI"
            alt="Địa đạo Củ Chi">

    `;


    /* TẠO LẠI TOOLTIP + CLICK */

    setupDoors();


    /* UPDATE TASKBAR */

    updateTaskbar();

}


/* =====================================
   GOOGLE MAPS
===================================== */

mapsBtn.addEventListener("click", function () {

    const googleMap =
        document.getElementById("googleMap");


    if (currentScene === "lobby") {

        googleMap.src =
            "https://www.google.com/maps?q=Ho+Chi+Minh+City&output=embed";

    }

    else {

        googleMap.src =
            scenes[currentScene].maps;

    }


    mapsModal.classList.add("show");

});


/* =====================================
   ĐÓNG MAPS
===================================== */

closeMaps.addEventListener("click", function () {

    mapsModal.classList.remove("show");

});


mapsModal.addEventListener("click", function (event) {

    if (event.target === mapsModal) {

        mapsModal.classList.remove("show");

    }

});


/* =====================================
   THÔNG TIN ĐỊA DANH
===================================== */

const infoData = {

    dinh: {

        title: "DINH ĐỘC LẬP",

        content: `

            <h2>
                Dinh Độc Lập – Dấu ấn của một thời lịch sử
            </h2>

            <p>
                Dinh Độc Lập là một trong những công trình lịch sử
                tiêu biểu của Thành phố Hồ Chí Minh. Nơi đây gắn liền
                với nhiều dấu mốc quan trọng của lịch sử Việt Nam
                trong thế kỷ XX.
            </p>


            <h2>
                Một công trình đặc biệt
            </h2>

            <p>
                Công trình hiện nay được xây dựng từ năm 1962 và
                hoàn thành vào năm 1966. Dinh được thiết kế theo
                phong cách kiến trúc hiện đại, kết hợp với những
                nét đặc trưng của văn hóa phương Đông.
            </p>


            <p>
                Không gian bên trong gồm nhiều phòng làm việc,
                phòng họp và khu vực sinh hoạt được thiết kế
                phục vụ cho hoạt động của chính quyền Việt Nam Cộng hòa
                trước năm 1975.
            </p>


            <div class="paper-quote">
                “Một công trình kiến trúc – một chứng nhân của lịch sử.”
            </div>


            <h2>
                Ngày 30 tháng 4 năm 1975
            </h2>


            <p>
                Sáng ngày 30/4/1975, xe tăng tiến vào khu vực Dinh
                Độc Lập. Sự kiện này đánh dấu sự kết thúc của
                Chiến tranh Việt Nam và mở ra một giai đoạn mới
                trong lịch sử đất nước.
            </p>


            <p>
                Hình ảnh xe tăng tiến vào Dinh Độc Lập và lá cờ
                được cắm trên nóc Dinh trở thành những biểu tượng
                nổi tiếng của ngày đất nước thống nhất.
            </p>


            <h2>
                📍 Thông tin địa điểm
            </h2>


            <p>
                <b>Địa chỉ:</b> 135 Nam Kỳ Khởi Nghĩa,
                Thành phố Hồ Chí Minh.
            </p>


            <p>
                <b>Ý nghĩa:</b> Một di tích lịch sử – văn hóa
                quan trọng của Thành phố Hồ Chí Minh.
            </p>

        `
    },


    ben: {

        title: "BẾN NHÀ RỒNG",

        content: `

            <h2>
                Bến Nhà Rồng – Nơi bắt đầu một hành trình
            </h2>

            <p>
                Bến Nhà Rồng là một địa danh lịch sử nằm bên
                sông Sài Gòn. Đây là nơi gắn liền với sự kiện
                Nguyễn Tất Thành ra đi tìm đường cứu nước vào
                năm 1911.
            </p>


            <h2>
                Năm 1911
            </h2>


            <p>
                Ngày 5/6/1911, từ Bến Nhà Rồng, người thanh niên
                Nguyễn Tất Thành đã lên con tàu Amiral Latouche-Tréville
                để bắt đầu hành trình ra nước ngoài.
            </p>


            <div class="paper-quote">
                Từ một bến cảng bên dòng sông Sài Gòn,
                một hành trình lớn của lịch sử đã bắt đầu.
            </div>


            <h2>
                Kiến trúc Bến Nhà Rồng
            </h2>


            <p>
                Công trình được xây dựng vào cuối thế kỷ XIX,
                ban đầu là trụ sở của một hãng vận tải đường biển.
                Hình ảnh mái ngói và các chi tiết kiến trúc
                đặc trưng đã tạo nên diện mạo riêng của công trình.
            </p>


            <h2>
                📍 Ngày nay
            </h2>


            <p>
                Hiện nay, nơi đây là Bảo tàng Hồ Chí Minh –
                Chi nhánh Thành phố Hồ Chí Minh, lưu giữ nhiều
                tư liệu và hiện vật liên quan đến cuộc đời,
                sự nghiệp của Chủ tịch Hồ Chí Minh.
            </p>

        `
    },


    diaDao: {

        title: "ĐỊA ĐẠO CỦ CHI",

        content: `

            <h2>
                Địa đạo Củ Chi – Thành phố dưới lòng đất
            </h2>


            <p>
                Địa đạo Củ Chi là một hệ thống đường hầm nằm
                dưới lòng đất ở khu vực Củ Chi, Thành phố Hồ Chí Minh.
                Đây là một trong những công trình quân sự đặc biệt
                trong thời kỳ chiến tranh.
            </p>


            <h2>
                Hệ thống đường hầm
            </h2>


            <p>
                Hệ thống địa đạo gồm nhiều tầng và có tổng chiều dài
                rất lớn. Bên trong từng có nơi ở, bếp, phòng họp,
                kho chứa và khu chăm sóc thương binh.
            </p>


            <h2>
                Cuộc sống dưới lòng đất
            </h2>


            <p>
                Người dân và lực lượng cách mạng từng sinh hoạt,
                làm việc và chiến đấu trong điều kiện vô cùng
                khó khăn dưới lòng đất.
            </p>


            <div class="paper-quote">
                Một không gian nhỏ bé nhưng chứa đựng
                ý chí và sức sống mạnh mẽ.
            </div>


            <h2>
                Những chi tiết đặc biệt
            </h2>


            <p>
                Trong địa đạo có nhiều công trình như bếp Hoàng Cầm,
                bệnh xá, phòng họp và các loại bẫy được thiết kế
                để bảo vệ hệ thống đường hầm.
            </p>


            <h2>
                📍 Ngày nay
            </h2>


            <p>
                Địa đạo Củ Chi hiện là một địa điểm tham quan,
                tìm hiểu lịch sử nổi tiếng của Thành phố Hồ Chí Minh.
            </p>

        `
    }

};


/* =====================================
   NÚT THÔNG TIN ĐỊA DANH
===================================== */

sceneInfoBtn.addEventListener("click", function () {

    if (!infoData[currentScene]) return;


    const info =
        infoData[currentScene];


    infoTitle.textContent =
        info.title;


    infoContent.innerHTML =
        info.content;


    infoContent.scrollTop = 0;


    infoModal.classList.add("show");

});


/* =====================================
   ĐÓNG INFO
===================================== */

closeInfo.addEventListener("click", function () {

    infoModal.classList.remove("show");

});


infoModal.addEventListener("click", function (event) {

    if (event.target === infoModal) {

        infoModal.classList.remove("show");

    }

});


/* =====================================
   2 KHU THAM QUAN - DINH ĐỘC LẬP
===================================== */

/* KHU 1 */

area1.addEventListener("click", () => {

    dinhAreas.style.display = "none";

    exhibitScene.classList.add("active");

    currentScrollScene = "exhibit";

});


/* KHU 2 */

area2.addEventListener("click", () => {

    dinhAreas.style.display = "none";

    familyScene.classList.add("active");

    currentScrollScene = "family";

});


/* =====================================
   BẾN - CỤC TRÒN NHÀ TRƯNG BÀY
===================================== */

benExploreBtn.addEventListener("click", () => {

    /*
       Hiện tại chỉ xử lý hiệu ứng click.
       Scene tiếp theo mình có thể gắn vào đây.
    */

    benExploreBtn.classList.add("clicked");

});


/* =====================================
   KHỞI TẠO
===================================== */

/* Ban đầu chỉ hiện lobby */

if (dinhScene) {

    dinhScene.style.display = "none";

}


if (dinhAreas) {

    dinhAreas.style.display = "none";

}


if (benScene) {

    benScene.classList.remove("active");

}


if (benExploreBtn) {

    benExploreBtn.style.display = "none";

}


currentScene = "lobby";


/* =====================================
   OBSERVER CHO SCROLL
===================================== */

const scrollSections =
    document.querySelectorAll(".scroll-section");


const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

            else {

                entry.target.classList.remove("active");

            }

        });

    },

    {

        threshold: 0.55

    }

);


scrollSections.forEach(section => {

    observer.observe(section);

});
