import React from 'react';
import styled from 'styled-components';
import ArtplayerComponent from 'artplayer-react';

const Player = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70%;
    width: 100%;
    padding: 20px;
    background-color: #000;
`;

export default React.memo(
    function({ options, setPlayer, setCurrentTime }) {
        return (
            <Player>
                <ArtplayerComponent
                    style={{
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                    }}
                    option={{
                        url: options.videoUrl,
                        loop: true,
                        autoSize: true,
                        subtitle: {
                            url: options.subtitleUrl,
                        },
                        moreVideoAttr: {
                            crossOrigin: 'anonymous',
                        },
                    }}
                    getInstance={art => {
                        setPlayer(art);

                        (function loop() {
                            window.requestAnimationFrame(() => {
                                if (art.playing) {
                                    setCurrentTime(art.currentTime);
                                }
                                loop();
                            });
                        })();

                        art.on('seek', () => {
                            setCurrentTime(art.currentTime);
                        });
                    }}
                />
            </Player>
        );
    },
    () => true,
);
