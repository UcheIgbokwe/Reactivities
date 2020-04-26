import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ProfileHeader from './ProfileHeader'
import ProfileContent from './ProfileContent'
import { RootStoreContext } from '../../app/stores/rootStore'
import { RouteComponentProps } from 'react-router'
import LoadingComponent from '../../app/layout/LoadingComponenet'
import { observer } from 'mobx-react-lite'

interface RouteParams {
    username: string,
}
interface IProps extends RouteComponentProps<RouteParams> {}

const ProfilePage: React.FC<IProps> = ({match}) => {
    const rootStore = useContext(RootStoreContext);
    const {loadingProfile, profile, loadProfile, follow, unfollow, isCurrentUser, loading, setActiveTab} = rootStore.profileStore;

    useEffect(() => {
        loadProfile(match.params.username)
    }, [loadProfile, match])

    if (loadingProfile) return <LoadingComponent content='Loading Profile...'/>

    return (
        <Grid>
            <Grid.Column>
                <ProfileHeader profile={profile!} isCurrentUser={isCurrentUser} follow={follow} unfollow={unfollow} loading={loading}/>
                <ProfileContent setActiveTab={setActiveTab}/>
            </Grid.Column>
        </Grid>
    )
}


export default observer(ProfilePage);