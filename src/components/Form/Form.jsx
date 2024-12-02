import React, { Component } from "react";

import css from './Form.module.css'

export class Form extends Component {


    render() {
        const { changedValue, submit,value } = this.props;
        return (
        <form onSubmit={submit} className={css.wrap}>
            <label className={css.title}>
                Name
                    <input className={css.field} type="text" name="name" required onChange={changedValue} value={value.name} />    
            </label>
            <label className={css.title}>
                Number
                    <input className={css.field} type="tel" name="number" required onChange={changedValue} value={value.number}/>
            </label>
            
            <button className={css.addBtn} type='submit'>Add contact</button>
        </form>     
        )
        
    }
}