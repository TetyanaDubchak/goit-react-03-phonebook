import css from './Contacts.module.css'
export const Contacts = ({contacts, forDelete }) => {
    return (
        <ul>{
            contacts.map((contact) => (<li key={contact.id} className={css.item}>
                <p className={css.text}>{contact.name}: {contact.number}</p>
                <button className={css.btn} type="button" onClick={()=>forDelete(contact.id)}>Delete</button>
            </li>)
            )}
        </ul>
    )
}