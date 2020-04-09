import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Grid, Tab, Header, Button } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore';
import ProfileEditForm from './ProfileEditForm';


const ProfileDescription = () => {
    const rootStore = useContext(RootStoreContext);
    const {profile, isCurrentUser, updateBio} = rootStore.profileStore; 
    const [editBioTab, setBioTab] = useState(false);
    
    
    
    return (
        <Tab.Pane>
            <Grid columns={1} divided>
                <Grid.Row>
                    <Grid.Column>
                        <Header floated='left' icon='user' content={`About ${profile!.displayName}`}/>
                        {isCurrentUser && 
                        <Button floated='right' basic content={editBioTab ? 'Cancel' : 'Edit'} onClick={() => setBioTab(!editBioTab)}/>}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        {editBioTab ? (
                            <ProfileEditForm updateBio={updateBio} profile={profile!}/>
                        ) : (
                            <span>{profile!.bio}</span>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Tab.Pane>
        
    )
}



export default observer(ProfileDescription);