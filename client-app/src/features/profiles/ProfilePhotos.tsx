import React, { useContext, useState } from 'react'
import { Tab, Header, Card, Image, Grid, Button } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore'
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget';
import { observer } from 'mobx-react-lite';

const ProfilePhotos = () => {
    const rootStore = useContext(RootStoreContext);
    const {profile, isCurrentUser, uploadPhoto, uploadingPhoto, setMainPhoto, loadingPhoto, deletePhoto} = rootStore.profileStore;  
    const [addPhotoTab, setPhotoTab] = useState(false); //the first function is created to open the add photo tab and the second will do the opposite.
    const [target, setTarget] = useState<string | undefined>(undefined);
    const [deleteTarget, setDeleteTarget] = useState<string | undefined>(undefined)

    //This will take care of closing the page after the photo has been added.
    const handleUploadImage = (photo: Blob) => {
        uploadPhoto(photo).then(() => setPhotoTab(false))
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='image' content='Photos'/>
                    {isCurrentUser && 
                    <Button floated='right' basic content={addPhotoTab ? 'Cancel' : 'Add Photo'} onClick={() => setPhotoTab(!addPhotoTab)}/>}
                </Grid.Column>
                <Grid.Column width={16}>
                {addPhotoTab ? (
                        <PhotoUploadWidget uploadPhoto={handleUploadImage} loading={uploadingPhoto}/>
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile && profile.photos.map((photo) => (
                                <Card key={photo.id}>
                                    <Image src={photo.url}/>
                                    {isCurrentUser && 
                                        <Button.Group fluid widths={2}>
                                            <Button name={photo.id} onClick={(e) => {setMainPhoto(photo); setTarget(e.currentTarget.name)}} loading={loadingPhoto && target === photo.id} disabled={photo.isMain} basic positive content='Main'/>
                                            <Button name={photo.id} disabled={photo.isMain} onClick={(e) => {deletePhoto(photo); setDeleteTarget(e.currentTarget.name)}} loading={loadingPhoto && deleteTarget === photo.id} basic negative icon='trash'/>
                                        </Button.Group>
                                    }
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                
                </Grid.Column>
            </Grid>
            
            
        </Tab.Pane>
    )
}


export default observer(ProfilePhotos);