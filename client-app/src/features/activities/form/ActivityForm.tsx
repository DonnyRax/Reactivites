import React, {useState, FormEvent, useContext, useEffect} from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import { SelectInput } from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';

interface DetailsParams {
    id: string
}

const ActivityForm : React.FC<RouteComponentProps<DetailsParams>> = ({match, history}) => {
    
    const activityStore = useContext(ActivityStore);
    const {submitting, activity: initialFormState, loadActivity, clearActivity} = activityStore;
    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    useEffect(() => {
        if(match.params.id && activity.id.length === 0){
            loadActivity(match.params.id).then(() => {
                initialFormState && setActivity(initialFormState);
            })
        }

        return () => {
            clearActivity();
        };
    }, [loadActivity, clearActivity, match.params.id, initialFormState, activity.id.length]);

    // const handleSubmit = () => {
    //     if(activity.id.length === 0){
    //         let newActivity = {
    //             ...activity,
    //             id: uuid()
    //         };
    //         createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    //     } else {
    //         editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    //     }
    // }

    const handleFinalFormSubmit = (values : any) => {
        console.log(values);
    };

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value });
    };

    return (
        <Grid>
            <Grid.Column width={10}>
            <Segment clearing>
                <FinalForm onSubmit={handleFinalFormSubmit} render={({handleSubmit}) => (
                    <Form onSubmit={handleSubmit} >
                        <Field name='title' placeholder='Title' value={activity.title} component={TextInput} />
                        <Field name='description' placeholder='Description' value={activity.description} component={TextAreaInput} rows='3' />
                        <Field name='category' placeholder='Category' value={activity.category} component={SelectInput} options={category} />
                        <Field name='date' placeholder='Date' value={activity.date!} component={DateInput} />
                        <Field name='city' placeholder='City' value={activity.city} component={TextInput} />
                        <Field name='venue' placeholder='Venue' value={activity.venue} component={TextInput} />
                        <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                        <Button onClick={() => history.push('/activities')} floated='right' type='submit' content='Cancel' />
                    </Form>
                )}>
                </FinalForm>
            </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityForm);