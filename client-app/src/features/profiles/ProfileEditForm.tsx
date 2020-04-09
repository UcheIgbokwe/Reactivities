import React from 'react'
import { observer } from 'mobx-react-lite'
import { Form, Button } from 'semantic-ui-react'
import { combineValidators, isRequired } from 'revalidate'
import { IProfile } from '../../app/models/profile';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../app/common/form/TextInput';
import TextAreaInput from '../../app/common/form/TextAreaInput';

const validate = combineValidators({
    displayName: isRequired('displayName')
});

interface IProps{
    updateBio: (profile: IProfile) => void;
    profile: IProfile;
}

const ProfileEditForm: React.FC<IProps> = ({updateBio, profile}) => {
    return (
        <FinalForm 
            validate={validate}
            initialValues={profile!}
            onSubmit={updateBio}
            render={({ handleSubmit, invalid, pristine, submitting }) => (
                <Form onSubmit={handleSubmit} error>
                    <Field  name='displayName' placeholder='Display Name' value={profile!.displayName} component={TextInput} />
                    <Field  name='bio' rows={3} placeholder='Bio' value={profile!.bio} component={TextAreaInput} />
               
                    <Button loading={submitting} disabled={invalid || pristine} floated='right' positive content='Update Bio'/>
                </Form>
            )}
        />
    )
}


export default observer(ProfileEditForm);