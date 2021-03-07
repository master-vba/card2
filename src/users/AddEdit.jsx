import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


import { userService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        cvc: Yup.string()
            .required('CVC is required'),
        expiry: Yup.string()
            .required('Last Name is required'),
        userName: Yup.string()
            .required('Name is required'),
        cardNumber: Yup.string()
            .required('Role is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(id, data);
    }

    function createUser(data) {
        return userService.create(data)
            .then(() => {
                alertService.success('Картица је додана!', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateUser(id, data) {
        return userService.update(id, data)
            .then(() => {
                alertService.success('Подаци су ажурирани!', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    const [user, setUser] = useState({});
    

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            userService.getById(id).then(user => {
                const fields = ['cvc', 'expiry', 'userName', 'cardNumber'];
                fields.forEach(field => setValue(field, user[field]));
                setUser(user);
            });
        }
    }, []);

    return (

        
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Додајте картицу' : 'Исмените податке са картице'}</h1>
            

            


            <div className="form-row">
                
                <div className="form-group col-5">
                    <label>CVC (са полеђине)</label>
                    <input name="cvc" type="number" ref={register} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>EXP (Датум истека)</label>
                    <input name="expiry" type="text" ref={register} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Име и презиме</label>
                    <input name="userName" type="text" ref={register} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Број картице</label>
                    <input name="cardNumber" type="number" ref={register} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
            </div>         
            
            
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Сними
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Поништи</Link>
            </div>
            <p></p>
            <div>
           

            </div>
        </form>
    );
}

export { AddEdit };