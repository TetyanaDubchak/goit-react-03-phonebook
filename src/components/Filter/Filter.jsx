import css from './Filter.module.css'
export const Filter = ({filter }) => {
    return (<>
        <p className={css.text}>Find contacts by name</p>
        <input className={css.field} type="text" name='filter' onChange={(filter)}/>
    </>
        
    )
}