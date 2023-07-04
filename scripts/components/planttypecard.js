export default function(props) {
    return `
        <button class="plants-newplant-modal-planttype" value="${props._id}">
            <div>${props.faname}</div>
            <div class="divider"></div>
            <div>${props.engname}</div>
        </button>
    `;
};