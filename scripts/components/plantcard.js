export default function(props) {
    return `
        <button class="plantcard rounded-xl overflow-hidden bg-white group/card" ref="${props.id}">
        <div class="aspect-video w-full">
            <img src="/images/card.png" alt="plant card's image">
        </div>
        <div class="p-4 space-y-2 text-right">
            <div class="font-semibold group-hover/card:text-green-400 transition-all">${props.name}</div>
            <div class="flex gap-2 items-center text-sm text-gray-400">
                <div>${props.fa}</div>
                <div class="aspect-square w-1 rounded-full bg-gray-400"></div>
                <div>${props.eng}</div>
            </div>
        </div>
        </button>
    `;
};