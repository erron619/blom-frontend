import Modal from "./../functions/modal";
import ComfimTextbox from "./../functions/Comfirmtextbox";
import Toggler from "../functions/Toggler";
import {post, get} from "./../functions/fetch";
import Routes from "./../functions/Routes";

import plantcard from "./../components/plantcard";
import planttypecard from "./../components/planttypecard";

export default function() {
    const page = document.querySelector("#plants-page");
    if (!page) return;
    // ======================== field =========================
    const field = document.querySelector("#plants-field");
    // placing plantcard on the feed
    get("panel/plants", { cookies: true })
    .then(res => {
        [...res.plants].forEach(item => {
            field.children[1].insertAdjacentHTML("beforeend", plantcard({ 
                name: item.name, 
                fa: item.type.faname, 
                eng: item.type.engname,
                id: item._id,
            }));
        });
    })
    .then(plantcard_init);
    // ================== cards description ===================
    const plantdesc_modal = {
        container: new Modal("#plants-plantdesc-modal"),
        name: new ComfimTextbox("#plants-plantdesc-modal-name"),
        faname: document.querySelector("#plants-plantdesc-modal-faname"),
        engname: document.querySelector("#plants-plantdesc-modal-engname"),
        date: document.querySelector("#plants-plantdesc-modal-date"),
        desc: document.querySelector("#plants-plantdesc-modal-desc"),
        advice: document.querySelector("#plants-plantdesc-modal-advices"),
    }
    function plantcard_init() {
        const items = document.querySelectorAll(".plantcard");
        items.forEach(item => {
            item.addEventListener("click", e => {
                e.preventDefault();
                const ref = item.getAttribute("ref");
                plantdesc_modal.container.open();
                post("panel/plants", { data: { id: ref } })
                .then(data => {
                    plantdesc_modal.name.input.value = data.name;
                    plantdesc_modal.faname.children[1].textContent  = data.type.faname;
                    plantdesc_modal.engname.children[1].textContent = data.type.engname;
                    plantdesc_modal.date.children[1].textContent    = new Date(data.createdDate).toLocaleDateString("fa-IR");
                    plantdesc_modal.desc.textContent = data.type.description;
                    plantdesc_modal.advice.textContent = data.advices;
                    plantdesc_modal.container.open("body");
                    plantdesc_modal.container.open("footer");
                })
            });
        });
    }
    plantdesc_modal.name.self.classList.remove("border-[1px]");
    plantdesc_modal.name.self.children[1].addEventListener("focus", e => plantdesc_modal.name.self.classList.add("border-[1px]"));
    plantdesc_modal.name.self.children[1].addEventListener("blur",  e => plantdesc_modal.name.self.classList.remove("border-[1px]"));
    // ====================== new group =======================
    const newgroup_create = document.querySelector("#plants-newgroup-create");
    const newgroup_modal = {
        container: new Modal("#plants-newgroup-modal"),
        name: document.querySelector("#plants-newgroup-modal-name"),
        members: new Toggler("multi", "plants-newgroup-modal-member"),
        submit: document.querySelector("#plants-newgroup-modal-submit"),
    }
    newgroup_create.addEventListener("click", e => {
        e.preventDefault;
        newgroup_modal.container.open();
    });
    // ====================== new plant =======================
    const newplant_create = document.querySelector("#plants-newplant-create");
    const newplant_modal = {
        container: new Modal("#plants-newplant-modal"),
        name: document.querySelector("#plants-newplant-modal-name"),
        type: undefined,
        field: document.querySelector("#plants-newplant-modal-field"),
        submit: document.querySelector("#plants-newplant-modal-submit"),
    }
    newplant_create.addEventListener("click", e => {
        e.preventDefault();
        newplant_modal.container.open();
        // get plant types data
        get(Routes.api.planttypes, { cookies: false })
        .then(res => {
            const planttypes = [...res];
            planttypes.forEach(item => {
                newplant_modal.field.insertAdjacentHTML("beforeend", planttypecard(item));
            });
            newplant_modal.type = new Toggler("single", "plants-newplant-modal-planttype");
            // fully loaded!
            newplant_modal.container.open("body");
            newplant_modal.container.open("footer");
        })
        .catch(err => {
            console.error(err);
        });
    });
    newplant_modal.submit.addEventListener("click", e => {
        e.preventDefault();
        const data = {
            name: newplant_modal.name.value,
            type: newplant_modal.type.list[0],
        }
        post("panel/newplant", { data }).then(data => {
            if (data.status == "SUCCESS") {
                newplant_modal.container.close();
                window.location.reload();
            }
            else {
                if (data.code == "INVALID" || data.code == "INTERNAL") {
                    console.log(data);
                }
            }
        });
    });
}