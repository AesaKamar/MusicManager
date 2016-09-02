"use strict";
/**
 * Initialize Electron components 
 */
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
const ipc = electron.ipcMain;


/**
 * Initialize global utilities
 */
const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');
const ytdl = require('youtube-dl');
const ffmpeg = require('fluent-ffmpeg');
const id3Reader = require('id3js');
const id3Writer = require('node-id3');


/**
 * Initialize the main window once the application loads
 */
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 900,
        width: 1600
    });
    mainWindow.loadURL('file://' + __dirname + '/main/main.html');
    mainWindow.on('closed', () => { mainWindow = null; });
});

/**
 * A function that promises to return the info from a file after it is downloaded
 * @param {string} url The Url to pull the audio/video from
 * @param {number} progress An out variable to keep track of the download progress between 0 and 1
 * @returns {Promise<object>} video_info Object containing video metadata
 */
function downloadFromUrl(url, progress) {
    return new Promise((resolve, reject) => {

        /**
         * Initialize variables
         */
        let video = ytdl(url, ["-x", "--audio-format", "mp3"], { cwd: __dirname });
        let stream;
        let video_info = new Promise((resolve1, reject1) => {
            ytdl.getInfo(url, ["-x", "--audio-format", "mp3"], (err, info) => {
                err ? reject1(err) : resolve1(info);
            });
        });

        /**
         * Handle Events
         */
        video_info.then((res, err) => {
            if (err) {
                reject(err);
            } else {
                stream = new ffmpeg(video)
                    .toFormat('mp3')
                    .saveToFile(res.title + '.mp3');
            }
        });

        video.on('info', (info) => {
            video_info = info;
            var pos = 0;

            video.on('data', (data) => {
                pos += data.length;
                progress = pos / info.size;
                console.log(progress);
            });
        });

        video.on('complete', (info) => {
            console.log('filename: ' + info._filename + ' already downloaded.');
        });

        video.on('end', () => {
            console.log('Finished downloading!');
            resolve(video_info);
        });

        video.on('error', (err) => {
            reject(err);
        });
    });
};

/**
 * A function that promises to return an mp3's id3 tags'
 * @param {string} file_path The path to the target mp3
 * @returns {Promise<object>} tags Contained ID3 tags
 */
function getID3Tags(file_path) {
    return new Promise((resolve, reject) => {
        id3Reader({ file: file_path, type: id3Reader.OPEN_LOCAL }, function(err, tags) {
            err ? reject(err) : resolve({ tags: tags, file_path: file_path });
        });
    });
};

/**
 * A function that promises to return the info from a file after it is downloaded
 * @param {object} tags An object containing ID3 tags to write
 * @param {string} file_path The path to the target mp3
 * @returns {Promise<bool>} success Status of the operation
 */
function setID3Tags(tags, file_path) {
    return new Promise((resolve, reject) => {
        id3Writer.write(tags, file_path) ? resolve({ tags: tags, file_path: file_path }) : reject(null);
    });
};






///================================================
/// TEST CODE
///================================================

var tags = {
    title: "Playing with Fire",
    artist: "Ronald Jenkees",
    album: "Disorganized Fun",
}

// let url = 'https://www.youtube.com/watch?v=X6X9WWte3nQ';
let url = 'https://www.youtube.com/watch?v=0O2aH4XLbto';

downloadFromUrl(url, 0)
    .then(
        (res) => {
            console.log(_.omit(res, ['formats']));
            return res;
        },
        (err) => {
            console.log(err);
        }
    )
    .then(
        (res) => {
            setID3Tags(tags, './' + res.title + '.mp3');
            return res;
        },
        (err) => {}
    )
    .then(
        (res) => {
            return getID3Tags('./' + res.title + '.mp3');
        },
        (err) => {}
    ).then(
        (res) => {
            console.log(res);
        },
        (err) => {}
    );