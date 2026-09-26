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
const benCompleteNotice =
    document.getElementById("benCompleteNotice");

const benExploreAgainBtn =
    document.getElementById("benExploreAgainBtn");

const benContinueExploreBtn =
    document.getElementById("benContinueExploreBtn");


/* ==================================================
   CÁC PHẦN TỬ GAME BẾN
================================================== */

const benGame =
    document.getElementById("benGame");

const benGameClose =
    document.getElementById("benGameClose");

const benClueStage =
    document.getElementById("benClueStage");

const benClueProgress =
    document.getElementById("benClueProgress");

const benClueCards =
    document.querySelectorAll(".ben-clue-card");

const benClueDetailTitle =
    document.getElementById("benClueDetailTitle");

const benClueDetailText =
    document.getElementById("benClueDetailText");

const benGameMessage =
    document.getElementById("benGameMessage");

const benSolveBtn =
    document.getElementById("benSolveBtn");

const benCipherStage =
    document.getElementById("benCipherStage");

const benCipherInput =
    document.getElementById("benCipherInput");

const benCipherMessage =
    document.getElementById("benCipherMessage");

const benCipherCheckBtn =
    document.getElementById("benCipherCheckBtn");

const benGameSuccess =
    document.getElementById("benGameSuccess");

const benOpenSiteBtn =
    document.getElementById("benOpenSiteBtn");


/* ==================================================
   DỮ LIỆU MANH MỐI BẾN NHÀ RỒNG
================================================== */

const benClueData = {

    place: {
        title: "MANH MỐI 01 — ĐỊA ĐIỂM",
        text:
            "Địa điểm nằm bên sông Sài Gòn, gắn liền với sự kiện Nguyễn Tất Thành ra đi tìm đường cứu nước năm 1911."
    },

    date: {
        title: "MANH MỐI 02 — THỜI GIAN",
        text:
            "Ngày tháng quan trọng đánh dấu thời điểm Nguyễn Tất Thành bắt đầu hành trình ra đi tìm đường cứu nước."
    },

    person: {
        title: "MANH MỐI 03 — NHÂN VẬT",
        text:
            "Người thanh niên mang tên Nguyễn Tất Thành, người bắt đầu hành trình ra đi tìm đường cứu nước."
    },

    ship: {
        title: "MANH MỐI 04 — CON TÀU",
        text:
            "Con tàu mà Nguyễn Tất Thành làm việc trên khi rời Bến Nhà Rồng năm 1911."
    }

};


/* =====================================
   LƯU MANH MỐI
===================================== */

let benCollectedClues = new Set();


/* ==================================================
   GAME BẾN NHÀ RỒNG
================================================== */

function openBenGame() {

    if (infoModal) {
        infoModal.classList.remove("show");
    }

    if (!benGame) {
        console.warn("Không tìm thấy #benGame");
        return;
    }

    benGame.classList.add("show");

    resetBenGame();
}


/* ==================================================
   RESET GAME BẾN
================================================== */

function resetBenGame() {

    if (!benGame) return;

    benCollectedClues.clear();

    if (benClueStage) {
        benClueStage.hidden = false;
    }

    if (benCipherStage) {
        benCipherStage.hidden = true;
    }

    if (benGameSuccess) {
        benGameSuccess.hidden = true;
    }

    if (benClueProgress) {
        benClueProgress.textContent = "0 / 4";
    }

    if (benGameMessage) {
        benGameMessage.textContent =
            "Hãy khám phá đủ 4 manh mối để tiếp tục.";
    }

    if (benCipherInput) {
        benCipherInput.value = "";
    }

    if (benCipherMessage) {
        benCipherMessage.textContent = "";
    }

    if (benSolveBtn) {
        benSolveBtn.disabled = true;
    }


    /* RESET 4 MANH MỐI */

    benClueCards.forEach(card => {

        card.classList.remove("found");

        const result =
            card.querySelector(".ben-clue-result");

        if (result) {
            result.style.display = "none";
        }

    });


    if (benClueDetailTitle) {
        benClueDetailTitle.textContent =
            "MANH MỐI";
    }

    if (benClueDetailText) {
        benClueDetailText.textContent =
            "Chọn một manh mối để khám phá thông tin.";
    }

}


/* ==================================================
   CLICK 4 MANH MỐI
================================================== */

benClueCards.forEach(card => {

    card.addEventListener("click", () => {

        const key = card.dataset.clue;

        const clue = benClueData[key];

        if (!clue) return;


        benCollectedClues.add(key);

        card.classList.add("found");


        const result =
            card.querySelector(".ben-clue-result");

        if (result) {
            result.style.display = "block";
        }


        if (benClueDetailTitle) {
            benClueDetailTitle.textContent =
                clue.title;
        }

        if (benClueDetailText) {
            benClueDetailText.textContent =
                clue.text;
        }


        if (benClueProgress) {
            benClueProgress.textContent =
                `${benCollectedClues.size} / 4`;
        }


        if (benCollectedClues.size === 4) {

            if (benGameMessage) {
                benGameMessage.textContent =
                    "Bạn đã thu thập đủ 4 manh mối. Hãy giải mật thư!";
            }

            if (benSolveBtn) {
                benSolveBtn.disabled = false;
            }

        } else {

            if (benGameMessage) {
                benGameMessage.textContent =
                    `Đã thu thập ${benCollectedClues.size} / 4 manh mối.`;
            }

        }

    });

});


/* ==================================================
   CHUYỂN SANG CÂU HỎI
================================================== */

if (benSolveBtn) {

    benSolveBtn.addEventListener("click", () => {

        if (benCollectedClues.size !== 4) {
            return;
        }

        if (benClueStage) {
            benClueStage.hidden = true;
        }

        if (benCipherStage) {
            benCipherStage.hidden = false;
        }

        if (benCipherInput) {
            benCipherInput.focus();
        }

    });

}


/* ==================================================
   CHUẨN HÓA CÂU TRẢ LỜI
================================================== */

function normalizeBenAnswer(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[.,!?;:()"'“”‘’]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


/* ==================================================
   KIỂM TRA MẬT THƯ
================================================== */

if (benCipherCheckBtn) {

    benCipherCheckBtn.addEventListener("click", () => {

        const answer =
            normalizeBenAnswer(
                benCipherInput
                    ? benCipherInput.value
                    : ""
            );


        const hasPerson =
            answer.includes("nguyen tat thanh");


        const hasEvent =
            answer.includes("tim duong cuu nuoc") ||
            answer.includes("ra di tim duong cuu nuoc");


        const hasYear =
            answer.includes("1911");


        if (
            hasPerson &&
            hasEvent &&
            hasYear
        ) {

            if (benCipherMessage) {
                benCipherMessage.textContent =
                    "Chính xác! Bạn đã giải mã được mật thư.";
            }

            if (benCipherStage) {
                benCipherStage.hidden = true;
            }

            if (benGameSuccess) {
                benGameSuccess.hidden = false;
            }

        } else {

            if (benCipherMessage) {
                benCipherMessage.textContent =
                    "Chưa chính xác. Hãy nhớ đến nhân vật, sự kiện và năm được gợi ra từ 4 manh mối.";
            }

        }

    });

}


/* ==================================================
   MỞ HỒ SƠ HÀNH TRÌNH
================================================== */

const historySite =
    "https://sites.google.com/view/hoiieubac/h%C3%A0nh-tr%C3%ACnh-c%E1%BB%A9u-n%C6%B0%E1%BB%9Bc?authuser=0";


if (benOpenSiteBtn) {

    benOpenSiteBtn.addEventListener("click", () => {

        window.open(historySite, "_blank");

        if (benGame) {
            benGame.classList.remove("show");
        }

        if (benCompleteNotice) {

            benCompleteNotice.hidden = false;

            setTimeout(() => {
                benCompleteNotice.classList.add("show");
            }, 50);

        }

    });

}


/* ==================================================
   ĐÓNG GAME BẾN
================================================== */

if (benGameClose) {

    benGameClose.addEventListener("click", () => {

        if (benGame) {
            benGame.classList.remove("show");
        }

    });

}


/* ==================================================
   KHÁM PHÁ LẠI BẾN
================================================== */

if (benExploreAgainBtn) {

    benExploreAgainBtn.addEventListener("click", () => {

        if (benCompleteNotice) {
            benCompleteNotice.classList.remove("show");
        }

        setTimeout(() => {

            if (benCompleteNotice) {
                benCompleteNotice.hidden = true;
            }


            if (benScene) {

                const background =
                    benScene.querySelector(".ben-background");

                if (background) {
                    background.src = "ben.png";
                }

                benScene.classList.add("active");
            }


            currentScene = "ben";

            if (museum) {
                museum.style.display = "none";
            }

            if (dinhScene) {
                dinhScene.style.display = "none";
            }

            if (benExploreBtn) {
                benExploreBtn.style.display = "flex";
            }

            updateTaskbar();

        }, 300);

    });

}


/* ==================================================
   TIẾP TỤC KHÁM PHÁ BẾN
================================================== */

if (benContinueExploreBtn) {

    benContinueExploreBtn.addEventListener("click", () => {

        if (benCompleteNotice) {
            benCompleteNotice.classList.remove("show");
        }

        setTimeout(() => {

            if (benCompleteNotice) {
                benCompleteNotice.hidden = true;
            }

            goBackToLobby();

        }, 300);

    });

}


/* =====================================
   TASKBAR
===================================== */

const backBtn =
    document.getElementById("backBtn");

const sceneInfoBtn =
    document.getElementById("sceneInfoBtn");

const mapsBtn =
    document.getElementById("mapsBtn");

const mapsModal =
    document.getElementById("mapsModal");

const closeMaps =
    document.getElementById("closeMaps");


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
   KIỂM TRA JS
===================================== */

console.log("SCRIPT ĐÃ CHẠY");

console.log({
    startBtn,
    exploreBtn,
    museum,
    dinhScene,
    dinhAreas,
    area1,
    area2,
    benScene,
    benExploreBtn,
    benGame,
    benGameClose,
    benSolveBtn,
    benCipherCheckBtn,
    benOpenSiteBtn
});


/* =====================================
   INTRO
===================================== */

if (startBtn) {

    startBtn.addEventListener("click", function () {

        if (welcomeBox) {
            welcomeBox.classList.add("hidden");
        }

        setTimeout(function () {

            if (welcomeBox) {
                welcomeBox.style.display = "none";
            }

            if (guideBox) {
                guideBox.classList.remove("hidden");
            }

        }, 900);

    });

}


/* =====================================
   BẮT ĐẦU THAM QUAN
===================================== */

if (exploreBtn) {

    exploreBtn.addEventListener("click", function () {

        if (guideBox) {
            guideBox.classList.add("hidden");
        }

        if (museum) {

            museum.classList.remove("hidden");

            museum.style.display = "block";

        }

        if (dinhScene) {
            dinhScene.style.display = "none";
        }


        if (benScene) {
            benScene.classList.remove("active");
        }


        if (benExploreBtn) {
            benExploreBtn.style.display = "none";
        }


        updateTaskbar();

        setupDoors();

    });

}


/* =====================================
   TẠO TOOLTIP CHO CỬA
===================================== */

function setupDoors() {

    if (!museum) return;

    document
        .querySelectorAll(".door")
        .forEach(door => {

            if (
                museum.querySelector(
                    `.door-tooltip[data-for="${door.dataset.name}"]`
                )
            ) {
                return;
            }


            const tooltip =
                document.createElement("div");

            tooltip.className =
                "door-tooltip";

            tooltip.dataset.for =
                door.dataset.name;

            tooltip.textContent =
                door.dataset.name;

            museum.appendChild(tooltip);


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


            door.addEventListener("click", () => {

                if (door.classList.contains("door1")) {

                    openScene("dinh");

                }

                else if (
                    door.classList.contains("door2")
                ) {

                    openScene("ben");

                }

                else if (
                    door.classList.contains("door3")
                ) {

                    openScene("diaDao");

                }

            });

        });

}


/* =====================================
   MỞ CẢNH
===================================== */

function openScene(sceneName) {

    if (!scenes[sceneName]) {
        console.warn(
            "Không tìm thấy scene:",
            sceneName
        );
        return;
    }


    historyStack.push(currentScene);

    currentScene = sceneName;


    document.body.classList.add("fade-out");


    setTimeout(() => {


        /* =================================
           DINH ĐỘC LẬP
        ================================= */

        if (sceneName === "dinh") {

            if (museum) {
                museum.style.display = "none";
            }


            if (benScene) {
                benScene.classList.remove("active");
            }


            if (dinhScene) {
                dinhScene.style.display = "block";
            }


            if (dinhAreas) {
                dinhAreas.style.display = "none";
            }


            updateTaskbar();

            document.body.classList.remove("fade-out");


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

            if (museum) {
                museum.style.display = "none";
            }


            if (dinhScene) {
                dinhScene.style.display = "none";
            }


            if (benScene) {
                benScene.classList.add("active");
            }


            if (benExploreBtn) {
                benExploreBtn.style.display = "none";
            }


            updateTaskbar();

            document.body.classList.remove("fade-out");


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

        if (dinhScene) {
            dinhScene.style.display = "none";
        }


        if (benScene) {
            benScene.classList.remove("active");
        }


        if (!museum) {
            document.body.classList.remove("fade-out");
            return;
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
                            class="diaDao-area"
                            id="diaDaoHotspot">

                            <span>
                                KHÁM PHÁ<br>
                                ĐỊA ĐẠO
                            </span>

                        </button>
                    `
                    : ""
                }

            </div>

        `;


        document.body.classList.remove("fade-out");


        updateTaskbar();


        /* =================================
           NOTICE ĐỊA ĐẠO
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
           NÚT KHÁM PHÁ ĐỊA ĐẠO
        ================================= */

        if (sceneName === "diaDao") {

            const diaDaoHotspot =
                document.getElementById(
                    "diaDaoHotspot"
                );


            if (diaDaoHotspot) {

                diaDaoHotspot.addEventListener(
                    "click",
                    () => {

                        openDiaDaoGame();

                    }
                );

            }

        }


    }, 500);

}


/* =====================================
   CHUYỂN SANG SCENE TIẾP THEO
===================================== */

function openNextScene(sceneName) {

    if (!scenes[sceneName]) {
        return;
    }

    document.body.classList.add("fade-out");


    setTimeout(() => {

        const scene =
            document.querySelector(".scene");


        if (!scene) {
            document.body.classList.remove("fade-out");
            return;
        }


        if (!scenes[sceneName].nextImage) {
            document.body.classList.remove("fade-out");
            return;
        }


        scene.innerHTML = `

            <img
                src="${scenes[sceneName].nextImage}"
                alt="${scenes[sceneName].name}">

        `;


        document.body.classList.remove("fade-out");

    }, 500);

}


/* =====================================
   HIỆN SƠ ĐỒ ĐỊA ĐẠO
===================================== */

function openDiaDaoMap() {

    document.body.classList.add("fade-out");


    setTimeout(() => {

        const scene =
            document.querySelector(".scene");


        if (!scene) {
            document.body.classList.remove("fade-out");
            return;
        }


        scene.innerHTML = `

            <div class="dia-dao-map-screen">

                <img
                    src="dd.png"
                    alt="Sơ đồ địa đạo Củ Chi"
                    class="dia-dao-map-full">

            </div>

        `;


        document.body.classList.remove("fade-out");

    }, 500);

}


/* =====================================
   HIỆN BẢNG THÔNG BÁO
===================================== */

function showNotice(
    title,
    text,
    buttonText
) {

    const notice =
        document.createElement("div");


    notice.className =
        "notice";


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
        notice.querySelector(
            "#noticeStartBtn"
        );


    if (!noticeStartBtn) {
        return;
    }


    noticeStartBtn.addEventListener(
        "click",
        () => {

            notice.classList.add(
                "notice-hide"
            );


            setTimeout(() => {

                notice.remove();


                /* DINH */

                if (currentScene === "dinh") {

                    showDinhAreas();

                }


                /* BẾN */

                if (currentScene === "ben") {

                    if (benExploreBtn) {
                        benExploreBtn.style.display =
                            "flex";
                    }

                }

            }, 400);

        }
    );

}


/* =====================================
   HIỆN 2 KHU DINH ĐỘC LẬP
===================================== */

function showDinhAreas() {

    if (!dinhAreas) return;

    dinhAreas.style.display = "flex";

}


/* =====================================
   UPDATE TASKBAR
===================================== */

function updateTaskbar() {

    if (!sceneInfoBtn) {
        return;
    }


    /* =================================
       LOBBY
    ================================= */

    if (currentScene === "lobby") {

        sceneInfoBtn.style.display = "none";

        return;

    }


    const scene =
        scenes[currentScene];


    if (!scene) {
        return;
    }


    sceneInfoBtn.style.display = "flex";


    /* =================================
       DINH
    ================================= */

    if (currentScene === "dinh") {

        sceneInfoBtn.innerHTML = `

            <svg viewBox="0 0 24 24">

                <path d="M4 5h16v14H4z"></path>

                <path d="M7 8h10"></path>

                <path d="M7 11h7"></path>

                <path d="M7 14h10"></path>

            </svg>

        `;

        sceneInfoBtn.title =
            "GÓC TƯ LIỆU LỊCH SỬ";

    }


    /* =================================
       BẾN
    ================================= */

    else if (currentScene === "ben") {

        sceneInfoBtn.innerHTML = `

            <svg viewBox="0 0 24 24">

                <path d="M4 5h16v14H4z"></path>

                <path d="M7 8h10"></path>

                <path d="M7 11h7"></path>

                <path d="M7 14h10"></path>

            </svg>

        `;

        sceneInfoBtn.title =
            "GÓC TƯ LIỆU LỊCH SỬ";

    }


    /* =================================
       CỦ CHI
    ================================= */

    else if (currentScene === "diaDao") {

        sceneInfoBtn.innerHTML = `

            <svg viewBox="0 0 24 24">

                <path d="M4 5h16v14H4z"></path>

                <path d="M7 8h10"></path>

                <path d="M7 11h7"></path>

                <path d="M7 14h10"></path>

            </svg>

        `;

        sceneInfoBtn.title =
            "GÓC TƯ LIỆU LỊCH SỬ";

    }


    else {

        sceneInfoBtn.innerHTML =
            scene.icon;

        sceneInfoBtn.title =
            scene.name;

    }

}


/* =====================================
   NÚT BACK
===================================== */

if (backBtn) {

    backBtn.addEventListener(
        "click",
        function () {


            /* =================================
               ĐANG Ở KHU CON CỦA DINH
            ================================= */

            if (currentScrollScene) {

                if (exhibitScene) {
                    exhibitScene.classList.remove(
                        "active"
                    );
                }

                if (familyScene) {
                    familyScene.classList.remove(
                        "active"
                    );
                }

                currentScrollScene = null;


                if (dinhAreas) {
                    dinhAreas.style.display = "flex";
                }

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

        }
    );

}


/* =====================================
   QUAY VỀ SẢNH
===================================== */

function goBackToLobby() {

    if (infoModal) {
        infoModal.classList.remove("show");
    }


    if (dinhScene) {
        dinhScene.style.display = "none";
    }


    if (benScene) {
        benScene.classList.remove("active");
    }


    if (benExploreBtn) {
        benExploreBtn.style.display = "none";
    }


    if (dinhAreas) {
        dinhAreas.style.display = "none";
    }


    currentScene = "lobby";


    if (!museum) {
        return;
    }


    museum.style.display = "block";

    museum.classList.remove("hidden");


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


    setupDoors();

    updateTaskbar();

}


/* =====================================
   GOOGLE MAPS
===================================== */

if (mapsBtn) {

    mapsBtn.addEventListener(
        "click",
        function () {

            const googleMap =
                document.getElementById(
                    "googleMap"
                );


            if (!googleMap || !mapsModal) {
                return;
            }


            if (currentScene === "lobby") {

                googleMap.src =
                    "https://www.google.com/maps?q=Ho+Chi+Minh+City&output=embed";

            }

            else if (
                scenes[currentScene] &&
                scenes[currentScene].maps
            ) {

                googleMap.src =
                    scenes[currentScene].maps;

            }


            mapsModal.classList.add("show");

        }
    );

}


/* =====================================
   ĐÓNG MAPS
===================================== */

if (closeMaps) {

    closeMaps.addEventListener(
        "click",
        function () {

            if (mapsModal) {
                mapsModal.classList.remove("show");
            }

        }
    );

}


if (mapsModal) {

    mapsModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === mapsModal
            ) {

                mapsModal.classList.remove(
                    "show"
                );

            }

        }
    );

}


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
   GAME KHÔI PHỤC TRANG SỬ
===================================== */

const dinhGame =
    document.getElementById("dinhGame");

const dinhGameClose =
    document.getElementById("dinhGameClose");

const newspaperSlots =
    document.getElementById("newspaperSlots");

const newspaperPieces =
    document.getElementById("newspaperPieces");

const newspaperProgress =
    document.getElementById("newspaperProgress");

const dinhGameMessage =
    document.getElementById("dinhGameMessage");

const checkNewspaperBtn =
    document.getElementById("checkNewspaperBtn");

const dinhHistory =
    document.getElementById("dinhHistory");

const dinhReplayBtn =
    document.getElementById("dinhReplayBtn");

const dinhContinueBtn =
    document.getElementById("dinhContinueBtn");


let placedPieces = 0;


/* =====================================
   MẢNH ĐANG ĐƯỢC CHỌN
===================================== */

let selectedPiece = null;


/* =====================================
   MỞ GAME
===================================== */

function openDinhGame() {

    if (!dinhGame) return;

    if (infoModal) {
        infoModal.classList.remove("show");
    }

    dinhGame.classList.add("show");

    resetDinhGame();

}


/* =====================================
   RESET GAME
===================================== */

function resetDinhGame() {

    if (
        !newspaperProgress ||
        !dinhGameMessage ||
        !checkNewspaperBtn ||
        !newspaperSlots ||
        !newspaperPieces
    ) {
        return;
    }


    placedPieces = 0;

    selectedPiece = null;


    newspaperProgress.textContent =
        "0 / 9";


    dinhGameMessage.textContent =
        "Kéo từng mảnh báo vào vị trí phù hợp.";


    checkNewspaperBtn.disabled =
        true;


    newspaperSlots
        .querySelectorAll(".newspaper-slot")
        .forEach(slot => {

            slot.classList.remove(
                "filled",
                "drag-over"
            );

            slot.innerHTML = "";

        });


    newspaperPieces.innerHTML = "";


    for (let i = 0; i < 9; i++) {

        const piece =
            document.createElement("button");

        piece.type =
            "button";

        piece.className =
            "newspaper-piece";

        piece.dataset.piece =
            i;

        piece.setAttribute(
            "aria-label",
            `Mảnh báo ${i + 1}`
        );

        piece.draggable =
            true;

        newspaperPieces.appendChild(
            piece
        );

    }


    shufflePieces();

    setupNewspaperGame();

}


/* =====================================
   TRỘN MẢNH
===================================== */

function shufflePieces() {

    if (!newspaperPieces) return;


    const pieces =
        Array.from(
            newspaperPieces.children
        );


    for (
        let i = pieces.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            pieces[i],
            pieces[j]
        ] =
        [
            pieces[j],
            pieces[i]
        ];

    }


    newspaperPieces.innerHTML = "";


    pieces.forEach(piece => {

        newspaperPieces.appendChild(
            piece
        );

    });

}


/* =====================================
   SETUP GAME
===================================== */

function setupNewspaperGame() {

    if (
        !newspaperPieces ||
        !newspaperSlots
    ) {
        return;
    }


    const pieces =
        newspaperPieces.querySelectorAll(
            ".newspaper-piece"
        );

    const slots =
        newspaperSlots.querySelectorAll(
            ".newspaper-slot"
        );


    pieces.forEach(piece => {


        piece.addEventListener(
            "dragstart",
            event => {

                selectedPiece =
                    piece;

                if (event.dataTransfer) {

                    event.dataTransfer.effectAllowed =
                        "move";

                    event.dataTransfer.setData(
                        "text/plain",
                        piece.dataset.piece
                    );

                }

                piece.classList.add(
                    "selected"
                );

            }
        );


        piece.addEventListener(
            "dragend",
            () => {

                piece.classList.remove(
                    "selected"
                );

            }
        );


        piece.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                selectPiece(piece);

            }
        );

    });


    slots.forEach(slot => {


        slot.addEventListener(
            "dragover",
            event => {

                event.preventDefault();

                slot.classList.add(
                    "drag-over"
                );

            }
        );


        slot.addEventListener(
            "dragleave",
            () => {

                slot.classList.remove(
                    "drag-over"
                );

            }
        );


        slot.addEventListener(
            "drop",
            event => {

                event.preventDefault();

                slot.classList.remove(
                    "drag-over"
                );


                if (!event.dataTransfer) {
                    return;
                }


                const pieceId =
                    event.dataTransfer.getData(
                        "text/plain"
                    );


                const piece =
                    newspaperPieces.querySelector(
                        `.newspaper-piece[data-piece="${pieceId}"]`
                    );


                if (piece) {

                    movePieceToSlot(
                        piece,
                        slot
                    );

                }

            }
        );


        slot.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                if (!selectedPiece) {
                    return;
                }


                movePieceToSlot(
                    selectedPiece,
                    slot
                );

            }
        );

    });

}


/* =====================================
   CHỌN MẢNH
===================================== */

function selectPiece(piece) {

    if (!piece) return;


    document
        .querySelectorAll(
            ".newspaper-piece.selected"
        )
        .forEach(item => {

            item.classList.remove(
                "selected"
            );

        });


    selectedPiece =
        piece;


    piece.classList.add(
        "selected"
    );


    if (dinhGameMessage) {

        dinhGameMessage.textContent =
            "Đã chọn mảnh. Hãy chọn vị trí muốn đặt.";

    }

}


/* =====================================
   TÌM SLOT HIỆN TẠI
===================================== */

function getPieceSlot(piece) {

    if (!piece) return null;


    const parent =
        piece.parentElement;


    if (
        parent &&
        parent.classList.contains(
            "newspaper-slot"
        )
    ) {

        return parent;

    }


    return null;

}


/* =====================================
   ĐẶT / DI CHUYỂN MẢNH
===================================== */

function movePieceToSlot(
    piece,
    targetSlot
) {

    if (
        !piece ||
        !targetSlot ||
        !newspaperPieces
    ) {
        return;
    }


    const oldSlot =
        getPieceSlot(piece);


    if (oldSlot === targetSlot) {

        selectedPiece = null;

        piece.classList.remove(
            "selected"
        );

        return;

    }


    const targetPiece =
        targetSlot.querySelector(
            ".newspaper-piece"
        );


    if (targetPiece) {

        if (oldSlot) {

            oldSlot.appendChild(
                targetPiece
            );

            oldSlot.classList.add(
                "filled"
            );

        }

        else {

            newspaperPieces.appendChild(
                targetPiece
            );

        }

    }


    if (oldSlot) {

        oldSlot.classList.remove(
            "filled"
        );

    }


    targetSlot.appendChild(
        piece
    );

    targetSlot.classList.add(
        "filled"
    );


    piece.classList.remove(
        "selected"
    );

    selectedPiece = null;


    updateNewspaperProgress();


    if (dinhGameMessage) {

        if (placedPieces < 9) {

            dinhGameMessage.textContent =
                "Tiếp tục ghép các mảnh còn lại.";

        }

        else {

            dinhGameMessage.textContent =
                "Đã ghép đủ 9 mảnh. Hãy kiểm tra trang báo!";

        }

    }

}


/* =====================================
   CẬP NHẬT TIẾN ĐỘ
===================================== */

function updateNewspaperProgress() {

    if (
        !newspaperSlots ||
        !newspaperProgress ||
        !checkNewspaperBtn
    ) {
        return;
    }


    const slots =
        newspaperSlots.querySelectorAll(
            ".newspaper-slot"
        );


    let count = 0;


    slots.forEach(slot => {

        if (
            slot.querySelector(
                ".newspaper-piece"
            )
        ) {

            count++;

        }

    });


    placedPieces =
        count;


    newspaperProgress.textContent =
        `${placedPieces} / 9`;


    checkNewspaperBtn.disabled =
        placedPieces !== 9;

}


/* =====================================
   KIỂM TRA BÀI
===================================== */

if (checkNewspaperBtn) {

    checkNewspaperBtn.addEventListener(
        "click",
        () => {

            if (!newspaperSlots) {
                return;
            }


            const slots =
                newspaperSlots.querySelectorAll(
                    ".newspaper-slot"
                );


            let correct =
                true;


            slots.forEach(
                (slot, index) => {

                    const piece =
                        slot.querySelector(
                            ".newspaper-piece"
                        );


                    if (!piece) {

                        correct =
                            false;

                        return;

                    }


                    if (
                        Number(
                            piece.dataset.piece
                        ) !== index
                    ) {

                        correct =
                            false;

                    }

                }
            );


            if (correct) {

                if (dinhGameMessage) {

                    dinhGameMessage.textContent =
                        "Hoàn thành! Trang báo đã được khôi phục.";

                }


                setTimeout(() => {

                    if (dinhGame) {
                        dinhGame.classList.remove(
                            "show"
                        );
                    }

                    if (dinhHistory) {
                        dinhHistory.classList.add(
                            "show"
                        );
                    }

                }, 700);

            }

            else {

                if (dinhGameMessage) {

                    dinhGameMessage.textContent =
                        "Chưa đúng rồi! Hãy đổi vị trí các mảnh và thử lại.";

                }

            }

        }
    );

}


/* =====================================
   ĐÓNG GAME DINH
===================================== */

if (dinhGameClose) {

    dinhGameClose.addEventListener(
        "click",
        () => {

            if (dinhGame) {

                dinhGame.classList.remove(
                    "show"
                );

            }

            selectedPiece =
                null;

        }
    );

}


/* =====================================
   CHƠI LẠI DINH
===================================== */

if (dinhReplayBtn) {

    dinhReplayBtn.addEventListener(
        "click",
        () => {

            if (dinhHistory) {

                dinhHistory.classList.remove(
                    "show"
                );

            }

            openDinhGame();

        }
    );

}


/* =====================================
   VIDEO DINH
===================================== */

const dinhVideo =
    document.getElementById("dinhVideo");

const dinhHistoryVideo =
    document.getElementById("dinhHistoryVideo");

const dinhVideoClose =
    document.getElementById("dinhVideoClose");


if (dinhContinueBtn) {

    dinhContinueBtn.addEventListener(
        "click",
        () => {

            if (dinhHistory) {
                dinhHistory.classList.remove(
                    "show"
                );
            }


            if (dinhVideo) {
                dinhVideo.classList.add(
                    "show"
                );
            }


            if (dinhHistoryVideo) {

                dinhHistoryVideo.currentTime =
                    0;

                dinhHistoryVideo
                    .play()
                    .catch(() => {});

            }

        }
    );

}


/* =====================================
   NOTICE HOÀN THÀNH DINH
===================================== */

const dinhCompleteNotice =
    document.getElementById(
        "dinhCompleteNotice"
    );

const dinhExploreAgainBtn =
    document.getElementById(
        "dinhExploreAgainBtn"
    );

const dinhContinueExploreBtn =
    document.getElementById(
        "dinhContinueExploreBtn"
    );


/* =====================================
   ĐÓNG VIDEO DINH
===================================== */

if (dinhVideoClose) {

    dinhVideoClose.addEventListener(
        "click",
        () => {

            if (dinhVideo) {

                dinhVideo.classList.remove(
                    "show"
                );

            }


            if (dinhHistoryVideo) {

                dinhHistoryVideo.pause();

                dinhHistoryVideo.currentTime =
                    0;

            }


            if (dinhCompleteNotice) {

                dinhCompleteNotice.classList.add(
                    "show"
                );

            }

        }
    );

}


/* =====================================
   KHÁM PHÁ LẠI DINH
===================================== */

if (dinhExploreAgainBtn) {

    dinhExploreAgainBtn.addEventListener(
        "click",
        () => {

            if (dinhCompleteNotice) {

                dinhCompleteNotice.classList.remove(
                    "show"
                );

            }


            if (museum) {
                museum.style.display = "none";
            }


            if (dinhScene) {

                dinhScene.style.display =
                    "block";

            }


            if (benScene) {

                benScene.classList.remove(
                    "active"
                );

            }


            currentScene =
                "dinh";


            if (dinhAreas) {

                dinhAreas.style.display =
                    "flex";

            }


            updateTaskbar();

        }
    );

}


/* =====================================
   TIẾP TỤC KHÁM PHÁ → VỀ MUSEUM
===================================== */

if (dinhContinueExploreBtn) {

    dinhContinueExploreBtn.addEventListener(
        "click",
        () => {

            if (dinhCompleteNotice) {

                dinhCompleteNotice.classList.remove(
                    "show"
                );

            }


            goBackToLobby();

        }
    );

}


/* =====================================
   2 KHU THAM QUAN - DINH
===================================== */

if (area1) {

    area1.addEventListener(
        "click",
        () => {

            if (dinhAreas) {

                dinhAreas.style.display =
                    "none";

            }


            if (exhibitScene) {

                exhibitScene.classList.add(
                    "active"
                );

            }


            currentScrollScene =
                "exhibit";

        }
    );

}


if (area2) {

    area2.addEventListener(
        "click",
        () => {

            if (dinhAreas) {

                dinhAreas.style.display =
                    "none";

            }


            if (familyScene) {

                familyScene.classList.add(
                    "active"
                );

            }


            currentScrollScene =
                "family";

        }
    );

}


/* =====================================
   BẾN → NHÀ TRƯNG BÀY
===================================== */

function openBenInside() {

    if (!benScene) return;


    document.body.classList.add(
        "fade-out"
    );


    setTimeout(() => {

        const background =
            benScene.querySelector(
                ".ben-background"
            );


        if (background) {

            background.src =
                "ben-inside.png";

        }


        if (benExploreBtn) {

            benExploreBtn.style.display =
                "none";

        }


        document.body.classList.remove(
            "fade-out"
        );


        updateTaskbar();

    }, 500);

}


if (benExploreBtn) {

    benExploreBtn.addEventListener(
        "click",
        () => {

            benExploreBtn.classList.add(
                "clicked"
            );


            setTimeout(() => {

                benExploreBtn.classList.remove(
                    "clicked"
                );


                openBenInside();

            }, 150);

        }
    );

}


/* =====================================
   KHỞI TẠO
===================================== */

if (dinhScene) {

    dinhScene.style.display =
        "none";

}


if (dinhAreas) {

    dinhAreas.style.display =
        "none";

}


if (benScene) {

    benScene.classList.remove(
        "active"
    );

}


if (benExploreBtn) {

    benExploreBtn.style.display =
        "none";

}


currentScene =
    "lobby";


/* =====================================
   OBSERVER CHO SCROLL
===================================== */

const scrollSections =
    document.querySelectorAll(
        ".scroll-section"
    );


if (
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                        }

                        else {

                            entry.target.classList.remove(
                                "active"
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.55
            }

        );


    scrollSections.forEach(
        section => {

            observer.observe(
                section
            );

        }
    );

}


/* ==================================================
   GAME ĐỊA ĐẠO CỦ CHI
================================================== */

const diaDaoGameData = [

    {
        id: "phongchihuy",

        name: "PHÒNG CHỈ HUY",

        image: "phongchihuy.png",

        info:
            "Phòng chỉ huy là nơi tổ chức, điều hành và đưa ra các quyết định quan trọng trong hệ thống địa đạo."
    },

    {
        id: "bep",

        name: "BẾP HOÀNG CẦM",

        image: "bep.png",

        info:
            "Bếp Hoàng Cầm được thiết kế để nấu ăn dưới lòng đất và hạn chế khói thoát ra ngoài."
    },

    {
        id: "kholuong",

        name: "KHO LƯƠNG",

        image: "kholuong.png",

        info:
            "Kho lương dùng để bảo quản lương thực, phục vụ cuộc sống và hoạt động của những người sống dưới địa đạo."
    },

    {
        id: "benhxa",

        name: "BỆNH XÁ",

        image: "benhxa.png",

        info:
            "Bệnh xá là nơi chăm sóc và điều trị thương binh trong hệ thống địa đạo."
    },

    {
        id: "vukhi",

        name: "KHU VŨ KHÍ",

        image: "vukhi.png",

        info:
            "Khu vũ khí là nơi phục vụ việc bảo quản và sử dụng các loại vũ khí."
    },

    {
        id: "khovukhi",

        name: "KHO VŨ KHÍ",

        image: "khovukhi.png",

        info:
            "Kho vũ khí là nơi cất giữ và bảo quản vũ khí trong hệ thống địa đạo."
    },

    {
        id: "phongsinhhoat",

        name: "PHÒNG SINH HOẠT",

        image: "phongsinhhoat.png",

        info:
            "Phòng sinh hoạt là không gian phục vụ đời sống và sinh hoạt của những người sống dưới lòng đất."
    }

];


/* ==================================================
   BIẾN GAME
================================================== */

let diaDaoGame =
    null;

let diaDaoPlaced =
    0;

let diaDaoInfoShown =
    new Set();


/* ==================================================
   MỞ GAME ĐỊA ĐẠO
================================================== */

function openDiaDaoGame() {

    if (infoModal) {

        infoModal.classList.remove(
            "show"
        );

    }


    createDiaDaoGame();

}


/* ==================================================
   VIDEO TƯ LIỆU LỊCH SỬ - CỦ CHI
================================================== */

function openDiaDaoHistoryVideo() {

    const oldVideo =
        document.getElementById(
            "diaDaoHistoryVideo"
        );


    if (oldVideo) {
        oldVideo.remove();
    }


    const videoModal =
        document.createElement("div");


    videoModal.id =
        "diaDaoHistoryVideo";


    videoModal.className =
        "dia-dao-history-video";


    videoModal.innerHTML = `

        <div class="dia-dao-history-box">

            <button
                class="dia-dao-history-close"
                id="closeDiaDaoHistoryVideo">

                ×

            </button>


            <div class="dia-dao-history-title">

                <span>
                    GÓC TƯ LIỆU LỊCH SỬ
                </span>

                <h2>
                    ĐỊA ĐẠO CỦ CHI
                </h2>

            </div>


            <div class="dia-dao-history-player">

                <iframe
                    src="https://www.youtube.com/embed/6KCNBWBK6UY"
                    title="Địa đạo Củ Chi | Xem phim 3D về Địa đạo Củ Chi"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>

            </div>


            <div class="video-source">

                Nguồn: YouTube – Địa đạo Củ Chi | Xem phim 3D về Địa đạo Củ Chi

            </div>

        </div>

    `;


    document.body.appendChild(
        videoModal
    );


    requestAnimationFrame(() => {

        videoModal.classList.add(
            "show"
        );

    });


    const closeBtn =
        document.getElementById(
            "closeDiaDaoHistoryVideo"
        );


    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            () => {

                videoModal.classList.remove(
                    "show"
                );


                setTimeout(() => {

                    videoModal.remove();

                }, 250);

            }
        );

    }


    videoModal.addEventListener(
        "click",
        (e) => {

            if (
                e.target === videoModal
            ) {

                videoModal.classList.remove(
                    "show"
                );


                setTimeout(() => {

                    videoModal.remove();

                }, 250);

            }

        }
    );

}


/* ==================================================
   ĐÓNG GAME ĐỊA ĐẠO
================================================== */

function closeDiaDaoGame() {

    if (!diaDaoGame) {
        return;
    }


    diaDaoGame.classList.remove(
        "show"
    );


    setTimeout(() => {

        if (diaDaoGame) {

            diaDaoGame.remove();

            diaDaoGame =
                null;

        }

    }, 250);

}


/* ==================================================
   TẠO GIAO DIỆN GAME
================================================== */

function createDiaDaoGame() {

    const oldGame =
        document.getElementById(
            "diaDaoGame"
        );


    if (oldGame) {
        oldGame.remove();
    }


    diaDaoPlaced =
        0;

    diaDaoInfoShown.clear();


    diaDaoGame =
        document.createElement(
            "div"
        );


    diaDaoGame.id =
        "diaDaoGame";


    diaDaoGame.className =
        "dia-dao-game";


    diaDaoGame.innerHTML = `

        <div class="dia-dao-game-box">

            <button
                type="button"
                class="dia-dao-close"
                id="diaDaoGameClose">

                ×

            </button>


            <div class="dia-dao-title">

                <h2>
                    KHÁM PHÁ CẤU TRÚC ĐỊA ĐẠO
                </h2>

                <p>
                    Kéo từng phòng vào đúng vị trí trên sơ đồ.
                </p>

            </div>


            <div class="dia-dao-board">


                <!-- SƠ ĐỒ -->

                <div
                    class="dia-dao-map"
                    id="diaDaoMap">

                    <img
                        src="dd.png"
                        alt="Sơ đồ địa đạo"
                        class="dia-dao-map-image">


                    <!-- 7 Ô TRỐNG -->

                    <div
                        class="dia-dao-slot"
                        data-slot="1">

                        <span>1</span>

                    </div>


                    <div
                        class="dia-dao-slot"
                        data-slot="2">

                        <span>2</span>

                    </div>


                    <div
                        class="dia-dao-slot"
                        data-slot="3">

                        <span>3</span>

                    </div>


                    <div
                        class="dia-dao-slot"
                        data-slot="4">

                        <span>4</span>

                    </div>


                    <div
                        class="dia-dao-slot"
                        data-slot="5">

                        <span>5</span>

                    </div>


                    <div
                        class="dia-dao-slot"
                        data-slot="6">

                        <span>6</span>

                    </div>


                    <div
                        class="dia-dao-slot"
                        data-slot="7">

                        <span>7</span>

                    </div>

                </div>


                <!-- KHAY PHÒNG -->

                <div class="dia-dao-rooms">

                    <h3>
                        CÁC KHU VỰC
                    </h3>


                    <p class="dia-dao-progress">

                        Đã hoàn thành:

                        <b id="diaDaoProgress">
                            0 / 7
                        </b>

                    </p>


                    <div
                        class="dia-dao-room-list"
                        id="diaDaoRoomList">
                    </div>


                    <p
                        class="dia-dao-message"
                        id="diaDaoMessage">

                        Hãy kéo các phòng vào đúng vị trí.

                    </p>

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(
        diaDaoGame
    );


    setupDiaDaoGame();


    setTimeout(() => {

        if (diaDaoGame) {

            diaDaoGame.classList.add(
                "show"
            );

        }

    }, 30);

}


/* ==================================================
   SETUP GAME
================================================== */

function setupDiaDaoGame() {

    if (!diaDaoGame) {
        return;
    }


    const roomList =
        document.getElementById(
            "diaDaoRoomList"
        );


    const slots =
        diaDaoGame.querySelectorAll(
            ".dia-dao-slot"
        );


    if (!roomList) {
        return;
    }


    /* TẠO 7 PHÒNG */

    diaDaoGameData.forEach(
        room => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "dia-dao-room";


            card.draggable =
                true;


            card.dataset.room =
                room.id;


            card.innerHTML = `

                <img
                    src="${room.image}"
                    alt="${room.name}">

                <span>
                    ${room.name}
                </span>

            `;


            roomList.appendChild(
                card
            );


            /* DESKTOP DRAG */

            card.addEventListener(
                "dragstart",
                event => {

                    if (
                        event.dataTransfer
                    ) {

                        event.dataTransfer.setData(
                            "text/plain",
                            room.id
                        );

                    }

                    card.classList.add(
                        "dragging"
                    );

                }
            );


            card.addEventListener(
                "dragend",
                () => {

                    card.classList.remove(
                        "dragging"
                    );

                }
            );


            /* MOBILE / CLICK */

            card.addEventListener(
                "click",
                () => {

                    diaDaoGame
                        .querySelectorAll(
                            ".dia-dao-room.selected"
                        )
                        .forEach(
                            item => {

                                item.classList.remove(
                                    "selected"
                                );

                            }
                        );


                    card.classList.add(
                        "selected"
                    );


                    diaDaoGame.dataset.selectedRoom =
                        room.id;


                    const message =
                        document.getElementById(
                            "diaDaoMessage"
                        );


                    if (message) {

                        message.textContent =
                            "Đã chọn " +
                            room.name +
                            ". Hãy chọn vị trí trên sơ đồ.";

                    }

                }
            );

        }
    );


    /* ==================================================
       CÁC Ô TRÊN SƠ ĐỒ
    ================================================== */

    slots.forEach(
        slot => {


            slot.addEventListener(
                "dragover",
                event => {

                    event.preventDefault();

                    slot.classList.add(
                        "drag-over"
                    );

                }
            );


            slot.addEventListener(
                "dragleave",
                () => {

                    slot.classList.remove(
                        "drag-over"
                    );

                }
            );


            slot.addEventListener(
                "drop",
                event => {

                    event.preventDefault();

                    slot.classList.remove(
                        "drag-over"
                    );


                    if (
                        !event.dataTransfer
                    ) {
                        return;
                    }


                    const roomId =
                        event.dataTransfer.getData(
                            "text/plain"
                        );


                    placeDiaDaoRoom(
                        roomId,
                        slot
                    );

                }
            );


            slot.addEventListener(
                "click",
                () => {

                    const roomId =
                        diaDaoGame.dataset.selectedRoom;


                    if (!roomId) {
                        return;
                    }


                    placeDiaDaoRoom(
                        roomId,
                        slot
                    );

                }
            );

        }
    );


    /* ĐÓNG GAME */

    const closeBtn =
        document.getElementById(
            "diaDaoGameClose"
        );


    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closeDiaDaoGame
        );

    }

}


/* ==================================================
   ĐẶT PHÒNG
================================================== */

function placeDiaDaoRoom(
    roomId,
    slot
) {

    if (
        !roomId ||
        !slot ||
        !diaDaoGame
    ) {
        return;
    }


    if (
        slot.querySelector(
            ".dia-dao-room-placed"
        )
    ) {
        return;
    }


    const room =
        diaDaoGameData.find(
            item =>
                item.id === roomId
        );


    if (!room) {
        return;
    }


    const correctRoom =
        Number(
            slot.dataset.slot
        ) ===
        diaDaoGameData.findIndex(
            item =>
                item.id === roomId
        ) + 1;


    /* ==================================================
       SAI
    ================================================== */

    if (!correctRoom) {

        slot.classList.add(
            "wrong"
        );


        const message =
            document.getElementById(
                "diaDaoMessage"
            );


        if (message) {

            message.textContent =
                "Chưa đúng vị trí. Hãy thử lại!";

        }


        setTimeout(() => {

            slot.classList.remove(
                "wrong"
            );

        }, 600);


        return;

    }


    /* ==================================================
       ĐÚNG
    ================================================== */

    const roomCard =
        diaDaoGame.querySelector(
            `.dia-dao-room[data-room="${roomId}"]`
        );


    if (!roomCard) {
        return;
    }


    const placed =
        document.createElement(
            "div"
        );


    placed.className =
        "dia-dao-room-placed";


    placed.innerHTML = `

        <img
            src="${room.image}"
            alt="${room.name}">

    `;


    slot.innerHTML = "";


    slot.appendChild(
        placed
    );


    slot.classList.add(
        "correct"
    );


    roomCard.classList.add(
        "completed"
    );


    roomCard.draggable =
        false;


    diaDaoPlaced++;


    const progress =
        document.getElementById(
            "diaDaoProgress"
        );


    if (progress) {

        progress.textContent =
            `${diaDaoPlaced} / 7`;

    }


    const message =
        document.getElementById(
            "diaDaoMessage"
        );


    if (message) {

        message.textContent =
            `Chính xác! Đây là ${room.name}.`;

    }


    /* HIỆN THÔNG TIN NGAY */

    showDiaDaoRoomInfo(
        room
    );


    diaDaoGame.dataset.selectedRoom =
        "";


    roomCard.classList.remove(
        "selected"
    );


    /* ==================================================
       HOÀN THÀNH
    ================================================== */

    if (
        diaDaoPlaced === 7
    ) {

        if (message) {

            message.textContent =
                "Bạn đã hoàn thành sơ đồ địa đạo!";

        }


        setTimeout(() => {

            openDiaDaoVideo();

        }, 1200);

    }

}


/* ==================================================
   THÔNG TIN PHÒNG
================================================== */

function showDiaDaoRoomInfo(
    room
) {

    if (!diaDaoGame) {
        return;
    }


    const oldInfo =
        document.getElementById(
            "diaDaoRoomInfo"
        );


    if (oldInfo) {
        oldInfo.remove();
    }


    const info =
        document.createElement(
            "div"
        );


    info.id =
        "diaDaoRoomInfo";


    info.className =
        "dia-dao-room-info";


    info.innerHTML = `

        <div class="dia-dao-room-info-box">

            <button
                type="button"
                class="dia-dao-info-close">

                ×

            </button>


            <h2>
                ${room.name}
            </h2>


            <p>
                ${room.info}
            </p>


            <button
                type="button"
                class="dia-dao-info-ok">

                TIẾP TỤC

            </button>

        </div>

    `;


    diaDaoGame.appendChild(
        info
    );


    setTimeout(() => {

        info.classList.add(
            "show"
        );

    }, 20);


    const close =
        info.querySelector(
            ".dia-dao-info-close"
        );

    const ok =
        info.querySelector(
            ".dia-dao-info-ok"
        );


    function closeInfoBox() {

        info.classList.remove(
            "show"
        );


        setTimeout(() => {

            if (info) {
                info.remove();
            }

        }, 250);

    }


    if (close) {

        close.addEventListener(
            "click",
            closeInfoBox
        );

    }


    if (ok) {

        ok.addEventListener(
            "click",
            closeInfoBox
        );

    }

}


/* ==================================================
   VIDEO ĐỊA ĐẠO
================================================== */

function openDiaDaoVideo() {

    if (diaDaoGame) {

        diaDaoGame.classList.remove(
            "show"
        );

    }


    let videoBox =
        document.getElementById(
            "diaDaoVideo"
        );


    if (!videoBox) {

        videoBox =
            document.createElement(
                "div"
            );


        videoBox.id =
            "diaDaoVideo";


        videoBox.className =
            "dia-dao-video";


        videoBox.innerHTML = `

            <div class="dia-dao-video-box">

                <button
                    type="button"
                    id="diaDaoVideoClose"
                    class="dia-dao-video-close">

                    ×

                </button>


                <video
                    id="diaDaoVideoPlayer"
                    controls
                    playsinline>

                    <source
                        src="diadao-video.mp4"
                        type="video/mp4">

                </video>


                <div class="dia-dao-video-source">

                    Nguồn: Tư liệu tham khảo

                </div>

            </div>

        `;


        document.body.appendChild(
            videoBox
        );


        const closeBtn =
            document.getElementById(
                "diaDaoVideoClose"
            );


        if (closeBtn) {

            closeBtn.addEventListener(
                "click",
                closeDiaDaoVideo
            );

        }

    }


    videoBox.classList.add(
        "show"
    );


    const video =
        document.getElementById(
            "diaDaoVideoPlayer"
        );


    if (video) {

        video.currentTime =
            0;

        video
            .play()
            .catch(() => {});

    }

}


/* ==================================================
   ĐÓNG VIDEO → NOTICE
================================================== */

function closeDiaDaoVideo() {

    const videoBox =
        document.getElementById(
            "diaDaoVideo"
        );


    const video =
        document.getElementById(
            "diaDaoVideoPlayer"
        );


    if (video) {

        video.pause();

        video.currentTime =
            0;

    }


    if (videoBox) {

        videoBox.classList.remove(
            "show"
        );

    }


    setTimeout(() => {

        showDiaDaoCompleteNotice();

    }, 300);

}


/* ==================================================
   NOTICE HOÀN THÀNH
================================================== */

function showDiaDaoCompleteNotice() {

    let notice =
        document.getElementById(
            "diaDaoCompleteNotice"
        );


    if (!notice) {

        notice =
            document.createElement(
                "div"
            );


        notice.id =
            "diaDaoCompleteNotice";


        notice.className =
            "dia-dao-complete-notice";


        notice.innerHTML = `

            <div class="dia-dao-complete-box">

                <h2>

                    BẠN ĐÃ HOÀN THÀNH
                    CHẶNG ĐỊA ĐẠO CỦ CHI

                </h2>


                <p>

                    Bạn đã khám phá và hoàn thành
                    sơ đồ các khu vực trong địa đạo.

                </p>


                <div class="dia-dao-complete-buttons">

                    <button
                        type="button"
                        id="diaDaoReplayBtn">

                        KHÁM PHÁ LẠI

                    </button>


                    <button
                        type="button"
                        id="diaDaoContinueBtn">

                        TIẾP TỤC KHÁM PHÁ

                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(
            notice
        );


        const replayBtn =
            document.getElementById(
                "diaDaoReplayBtn"
            );


        const continueBtn =
            document.getElementById(
                "diaDaoContinueBtn"
            );


        if (replayBtn) {

            replayBtn.addEventListener(
                "click",
                () => {

                    notice.classList.remove(
                        "show"
                    );


                    if (diaDaoGame) {

                        diaDaoGame.remove();

                        diaDaoGame =
                            null;

                    }


                    openDiaDaoGame();

                }
            );

        }


        if (continueBtn) {

            continueBtn.addEventListener(
                "click",
                () => {

                    notice.classList.remove(
                        "show"
                    );


                    goBackToLobby();

                }
            );

        }

    }


    notice.classList.add(
        "show"
    );

}


/* ==================================================
   TASKBAR → DINH / BẾN / CỦ CHI
================================================== */

if (sceneInfoBtn) {

    sceneInfoBtn.addEventListener(
        "click",
        function () {


            /* =================================
               DINH
            ================================= */

            if (
                currentScene === "dinh"
            ) {

                openDinhGame();

                return;

            }


            /* =================================
               BẾN
            ================================= */

            if (
                currentScene === "ben"
            ) {

                openBenGame();

                return;

            }


            /* =================================
               ĐỊA ĐẠO
            ================================= */

            if (
                currentScene === "diaDao"
            ) {

                openDiaDaoHistoryVideo();

                return;

            }


            /* =================================
               THÔNG TIN KHÁC
            ================================= */

            if (
                !infoData[currentScene]
            ) {
                return;
            }


            const info =
                infoData[currentScene];


            if (infoTitle) {

                infoTitle.textContent =
                    info.title;

            }


            if (infoContent) {

                infoContent.innerHTML =
                    info.content;

                infoContent.scrollTop =
                    0;

            }


            if (infoModal) {

                infoModal.classList.add(
                    "show"
                );

            }

        }
    );

}


/* =====================================
   ĐÓNG INFO
===================================== */

if (closeInfo) {

    closeInfo.addEventListener(
        "click",
        () => {

            if (infoModal) {

                infoModal.classList.remove(
                    "show"
                );

            }

        }
    );

}


if (infoModal) {

    infoModal.addEventListener(
        "click",
        event => {

            if (
                event.target === infoModal
            ) {

                infoModal.classList.remove(
                    "show"
                );

            }

        }
    );

}


/* =====================================
   KHỞI TẠO TASKBAR
===================================== */

updateTaskbar();


/* =====================================
   KẾT THÚC SCRIPT
===================================== */

console.log(
    "SCRIPT ĐÃ KHỞI TẠO XONG — KHÔNG LỖI LISTENER"
);
